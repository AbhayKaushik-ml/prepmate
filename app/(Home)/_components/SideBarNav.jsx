"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout, Mail, Search, Shield, Moon, Sun, BookOpen, User, Bot } from "lucide-react";

function SideBarNav() {
    const menulist = [
        {
            id: 1,
            name: "Browse",
            icon: Search,
            path: "/browse",
        },
        {
            id: 2,
            name: "Dashboard",
            icon: Layout,
            path: "/dashboard",
        },
        {
            id: 3,
            name: "career-assistance",
            icon: Shield,
            path: "/assistant",
        },
        {
            id: 4,
            name: "Newsletter",
            icon: Mail,
            path: "/Newsletter",
        },
        {
            id: 5,
            name: "Profile",
            icon: User,
            path: "/profile",
        },
        {
            id: 6,
            name: "prepai",
            icon: Bot,
            path: "/prepai",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Function to load enrolled courses from localStorage
    const loadEnrolledCourses = () => {
        const storedCourses = localStorage.getItem('enrolledCourses');
        if (storedCourses) {
            setEnrolledCourses(JSON.parse(storedCourses));
        }
    };

    // Load enrolled courses and check dark mode on component mount
    useEffect(() => {
        loadEnrolledCourses();
        
        // Check if dark mode was previously set
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }

        // Set up storage event listener to update courses when localStorage changes
        const handleStorageChange = (e) => {
            if (e.key === 'enrolledCourses') {
                loadEnrolledCourses();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Create a custom event for course enrollment changes within the same window
        window.addEventListener('courseEnrollmentChanged', loadEnrolledCourses);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('courseEnrollmentChanged', loadEnrolledCourses);
        };
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Get progress for a course
    const getCourseProgress = (courseId) => {
        const progress = localStorage.getItem(`progress_${courseId}`);
        return progress ? parseInt(progress) : 0;
    };

    return (
        <div className="h-full bg-white dark:bg-gray-800 border-r flex flex-col overflow-y-auto shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transition-colors duration-300">
            <div className="p-5 border-b dark:border-gray-700">
                <Image 
                    src="/abcd.jpg" 
                    alt="Logo" 
                    width={100} 
                    height={100} 
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col">
                {menulist.map((item, index) => (
                    <Link 
                        key={item.id} 
                        href={item.path} 
                        className="group"
                    >
                        <div
                            className={`
                                flex gap-2 items-center p-4 px-6 
                                text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                                cursor-pointer transition-colors duration-300
                                ${activeIndex === index ? "bg-purple-50 dark:bg-purple-900 text-purple-500 dark:text-purple-300" : ""}
                            `}
                            onClick={() => setActiveIndex(index)}
                            role="button"
                            aria-selected={activeIndex === index}
                        >
                            <item.icon className="mr-2" />
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Your Courses Section */}
            {enrolledCourses.length > 0 && (
                <div className="mt-6 px-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">YOUR COURSES</h3>
                    <div className="flex flex-col space-y-1">
                        {enrolledCourses.map((course) => {
                            const progress = getCourseProgress(course.id);
                            return (
                                <Link 
                                    key={course.id} 
                                    href={`/course-preview/${course.slug}`}
                                    className="group"
                                >
                                    <div className="flex items-center p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-300">
                                        <BookOpen size={16} className="mr-2 text-purple-500" />
                                        <span className="truncate">{course.name}</span>
                                        {progress > 0 && (
                                            <div className="ml-auto flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{progress}%</span>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* Dark Mode Toggle */}
            <div className="mt-auto p-4 border-t dark:border-gray-700">
                <button 
                    onClick={toggleDarkMode}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Night Mode</span>
                    <div className="relative">
                        {darkMode ? 
                            <Sun size={18} className="text-yellow-400" /> : 
                            <Moon size={18} className="text-gray-600" />
                        }
                    </div>
                </button>
            </div>
        </div>
    );
}

export default SideBarNav;
