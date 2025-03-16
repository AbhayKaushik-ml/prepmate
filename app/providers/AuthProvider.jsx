"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

// Create a context for authentication state
const AuthContext = createContext(null);

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const [isDbUserLoaded, setIsDbUserLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to load user data from your Neon/Drizzle database when Clerk user is loaded
  useEffect(() => {
    const syncUserWithDatabase = async () => {
      if (!isLoaded) return; // Wait for Clerk to load

      if (!isSignedIn || !user) {
        // User is not signed in, clear any stored user data
        console.log('User not signed in, clearing data');
        setDbUser(null);
        setIsDbUserLoaded(true);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch or create user in your database using the Clerk user ID
        const userEmail = user.primaryEmailAddress?.emailAddress;
        
        if (!userEmail) {
          console.error("No email found for user");
          setIsDbUserLoaded(true);
          setIsLoading(false);
          return;
        }

        console.log('User signed in:', { 
          id: user.id, 
          email: userEmail, 
          name: user.fullName || user.firstName 
        });

        // Here you would typically fetch the user from your Neon database
        // For now, we'll just create a simplified version for testing
        const userData = {
          id: 1,
          name: user.fullName || user.firstName || 'User',
          email: userEmail,
          isMember: localStorage.getItem(`user_${user.id}_member`) === 'true',
          isAdmin: localStorage.getItem(`user_${user.id}_admin`) === 'true'
        };
        
        setDbUser(userData);
        
        // Only try to call the API if in a browser environment and if the API route is set up
        // Now that NEXT_PUBLIC_API_ENABLED is true, this will execute
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_ENABLED === 'true') {
          try {
            console.log('Calling API to sync user with database...');
            
            const payload = {
              clerkId: user.id,
              email: userEmail,
              name: user.fullName || user.firstName || userEmail.split('@')[0],
            };
            
            console.log('Sending payload:', payload);
            
            const response = await fetch('/api/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            console.log('API response status:', response.status);
            
            if (response.ok) {
              const apiUserData = await response.json();
              console.log('User data synced with database:', apiUserData);
              // Merge with the user data we already have
              setDbUser(prev => ({ ...prev, ...apiUserData }));
            } else {
              const errorText = await response.text();
              console.error('Failed to sync user with database:', errorText);
            }
          } catch (apiError) {
            console.error("API call failed, using fallback user data:", apiError);
            // Continue with the fallback data
          }
        } else {
          console.log('API call skipped:', { 
            inBrowser: typeof window !== 'undefined', 
            apiEnabled: process.env.NEXT_PUBLIC_API_ENABLED === 'true' 
          });
        }
      } catch (error) {
        console.error("Error syncing user with database:", error);
      } finally {
        setIsDbUserLoaded(true);
        setIsLoading(false);
      }
    };

    syncUserWithDatabase();
  }, [isLoaded, isSignedIn, user]);

  // Value to be provided by the context
  const value = {
    user,                 // Clerk user
    dbUser,               // Your database user
    isAuthenticated: !!isSignedIn,
    isLoading: isLoading,
    isMember: dbUser?.isMember || false,
    isAdmin: dbUser?.isAdmin || false,
    
    // Function to check if user has access to a resource
    hasAccess: (requiredRole) => {
      if (!isSignedIn) return false;
      if (!requiredRole) return true; // No role required
      if (requiredRole === 'member' && dbUser?.isMember) return true;
      if (requiredRole === 'admin' && dbUser?.isAdmin) return true;
      return false;
    },
    
    // Function to set membership status (for testing without a database)
    setMembershipStatus: (isMember) => {
      if (!user) return;
      localStorage.setItem(`user_${user.id}_member`, isMember ? 'true' : 'false');
      setDbUser(prev => prev ? { ...prev, isMember } : null);
    },
    
    // Function to refresh user data from database
    refreshUser: async () => {
      setIsLoading(true);
      try {
        // For now, just reapply the same logic as in syncUserWithDatabase
        if (!user) {
          setDbUser(null);
          return;
        }
        
        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) return;
        
        // Update with localStorage values for testing
        setDbUser(prev => ({
          ...prev,
          isMember: localStorage.getItem(`user_${user.id}_member`) === 'true',
          isAdmin: localStorage.getItem(`user_${user.id}_admin`) === 'true'
        }));
        
        // Only try to call the API if in a browser environment and if the API route is set up
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_ENABLED === 'true') {
          try {
            const response = await fetch(`/api/user?clerkId=${encodeURIComponent(userEmail)}`);
            if (response.ok) {
              const userData = await response.json();
              setDbUser(prev => ({ ...prev, ...userData }));
            }
          } catch (error) {
            console.error("API call failed during refresh:", error);
          }
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 