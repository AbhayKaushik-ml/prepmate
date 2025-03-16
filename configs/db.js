import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Database initialization function with error handling
function initializeDatabase() {
  try {
    // Check if the required environment variables are set
    if (!process.env.NEON_DATABASE_URL) {
      console.warn('NEON_DATABASE_URL environment variable is not set. Database features will be disabled.');
      // Return a mock DB object that won't throw errors when methods are called
      return {
        select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
        insert: () => ({ values: () => ({ returning: () => [{ id: 1, name: 'Mock User', email: 'mock@example.com', isMember: false }] }) }),
        // Add other methods as needed
      };
    }

    // Create the connection
    const connectionString = process.env.NEON_DATABASE_URL;
    const client = postgres(connectionString);
    return drizzle(client);
  } catch (error) {
    console.error('Error initializing database:', error);
    // Return a mock DB object
    return {
      select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
      insert: () => ({ values: () => ({ returning: () => [{ id: 1, name: 'Mock User', email: 'mock@example.com', isMember: false }] }) }),
      // Add other methods as needed
    };
  }
}

export const db = initializeDatabase();
