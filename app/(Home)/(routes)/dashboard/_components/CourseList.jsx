"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import CourseCardItem from './CourseCardItem'

function CourseList() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(0);

    // Function to refresh courses
    const refreshCourses = useCallback(() => {
        setRefreshFlag(prev => prev + 1);
    }, []);

    // Set up a refresh interval
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (courses.some(course => course.status === 'Generating')) {
                refreshCourses();
            }
        }, 10000); // Refresh every 10 seconds if we have courses in 'Generating' state
        
        return () => clearInterval(intervalId);
    }, [courses, refreshCourses]);

    // Get the course list
    useEffect(() => {
        if (user) {
            GetCourseList();
        }
    }, [user, refreshFlag]);

    const GetCourseList = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.post('/api/courses', {
                createdBy: user?.primaryEmailAddress?.emailAddress
            });
            
            console.log('Courses loaded:', result.data.result);
            setCourses(result.data.result);
        } catch (error) {
            console.error('Failed to load courses:', error);
            setError('Failed to load your courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Study Material</h1>
                <button 
                    onClick={refreshCourses}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Refresh
                </button>
            </div>
            
            {error && (
                <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : courses.length === 0 ? (
                <div className="p-6 text-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">You haven't created any courses yet.</p>
                    <button 
                        onClick={() => window.location.href = '/prepai'}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create Your First Course
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-6">
                    {courses.map((course, index) => (
                        <CourseCardItem 
                            key={`${course.courseId}-${course.status || 'new'}`}
                            course={course} 
                            onStatusChange={refreshCourses}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CourseList
