import React, { useEffect, useState } from 'react';
import { getCourseList, getCoursesByTag } from '@/app/_services';
import CourseItem from './CourseItem';
import Link from 'next/link';
import { CircleDashed } from 'lucide-react';

function CourseList({ categoryFilter = null }) {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'free', 'paid'
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);

  // Fetch Course List
  const getAllCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      let resp;

      if (categoryFilter) {
        // If a category filter is provided, fetch courses by that tag
        resp = await getCoursesByTag(categoryFilter);
      } else {
        // Otherwise, fetch all courses
        resp = await getCourseList();
      }
      
      setCourseList(resp || []);
      
      // Apply initial filter
      let initialFiltered = resp || [];
      
      // Apply price filter if it's not 'all'
      if (priceFilter === 'free') {
        initialFiltered = initialFiltered.filter(course => course.free);
      } else if (priceFilter === 'paid') {
        initialFiltered = initialFiltered.filter(course => !course.free);
      }
      
      setFilteredCourses(initialFiltered);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load enrolled courses and calculate total progress
  useEffect(() => {
    const loadEnrolledData = () => {
      const storedEnrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      setEnrolledCourses(storedEnrolledCourses);
      
      // Calculate total progress
      let totalProgressSum = 0;
      let courseCount = 0;
      
      storedEnrolledCourses.forEach(course => {
        const progress = localStorage.getItem(`progress_${course.id}`);
        if (progress) {
          totalProgressSum += parseInt(progress);
          courseCount++;
        }
      });
      
      if (courseCount > 0) {
        setTotalProgress(Math.round(totalProgressSum / courseCount));
      }
    };

    loadEnrolledData();
    
    // Listen for enrollment changes
    window.addEventListener('courseEnrollmentChanged', loadEnrolledData);
    
    return () => {
      window.removeEventListener('courseEnrollmentChanged', loadEnrolledData);
    };
  }, []);

  // Fetch courses whenever categoryFilter changes
  useEffect(() => {
    getAllCourses();
  }, [categoryFilter]);

  // Apply price filter
  useEffect(() => {
    if (courseList.length === 0) return;
    
    let filtered = [...courseList];
    
    // Apply price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.free);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => !course.free);
    }
    
    setFilteredCourses(filtered);
  }, [priceFilter, courseList]);

  // Get the count of enrolled courses in this category
  const getEnrolledCount = () => {
    if (categoryFilter) {
      return enrolledCourses.filter(course => {
        return course.categoryPath.includes(categoryFilter);
      }).length;
    }
    return enrolledCourses.length;
  };

  // Get category display name
  const getCategoryDisplayName = () => {
    if (!categoryFilter) return 'All';
    
    const categories = {
      'ml-ai': 'Machine Learning & AI',
      'web-dev': 'Web Development',
      'mobile-dev': 'Mobile Development',
      'cloud-computing': 'Cloud Computing',
      'devops': 'DevOps',
      'mlops': 'MLOps',
      'dsa': 'Data Structures & Algorithms'
    };
    
    return categories[categoryFilter] || categoryFilter.toUpperCase();
  };

  return (
    <div className="space-y-5">
      {/* Dashboard Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">Learning Dashboard</h3>
            <p className="text-sm opacity-80">
              {getEnrolledCount()} course{getEnrolledCount() !== 1 ? 's' : ''} enrolled
              {categoryFilter ? ` in ${getCategoryDisplayName()}` : ''}
            </p>
          </div>
          
          <div className="flex items-center">
            {/* Circular Progress Indicator */}
            <div className="relative w-16 h-16">
              <CircleDashed className="w-16 h-16 text-white opacity-20" />
              <svg className="absolute top-0 left-0 w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  strokeWidth="3"
                  stroke="white"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={(2 * Math.PI * 28) * (1 - totalProgress / 100)}
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {totalProgress}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-[20px] font-bold text-gray-700 dark:text-gray-300">
          {getCategoryDisplayName()} Courses
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              priceFilter === 'all'
                ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setPriceFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              priceFilter === 'free'
                ? 'bg-white dark:bg-gray-700 shadow text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
            onClick={() => setPriceFilter('free')}
          >
            Free
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              priceFilter === 'paid'
                ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
            onClick={() => setPriceFilter('paid')}
          >
            Paid
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md p-5">
        {/* Error Handling */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
            <p>Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item) => (
                <Link href={`/course-preview/${item.slug}`} key={item.id}>
                  <CourseItem course={item} />
                </Link>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400 col-span-full text-center py-10">
                <p className="mb-2">No courses available.</p>
                <p className="text-sm">
                  {priceFilter !== 'all' 
                    ? `Try changing the filter from "${priceFilter}" to "all".` 
                    : categoryFilter 
                      ? `No courses found in the "${getCategoryDisplayName()}" category.` 
                      : ''
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;
