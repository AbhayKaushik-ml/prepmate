"use client"

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">PrepMate</span>
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto">
              Your ultimate companion for exam preparation. Access organized study materials, 
              interactive practice tests, and personalized learning paths.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-lg shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Personalized Learning</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Adaptive study plans tailored to your strengths and weaknesses.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-lg shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Comprehensive Materials</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Access a vast library of study resources and practice tests.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-lg shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Assistant</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Get instant help with difficult concepts and questions.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 PrepMate. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
