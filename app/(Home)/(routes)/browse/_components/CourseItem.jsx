import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Check, Plus, Minus } from 'lucide-react';

function CourseItem({ course, showProgress = true }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Check if the course is enrolled on component mount
  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const enrolled = enrolledCourses.some(c => c.id === course.id);
    setIsEnrolled(enrolled);

    // Get progress from localStorage if available
    const courseProgress = localStorage.getItem(`progress_${course.id}`);
    if (courseProgress) {
      setProgress(parseInt(courseProgress));
    }
  }, [course.id]);

  const handleEnrollment = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    if (isEnrolled) {
      // Remove from enrolled courses
      const updatedCourses = enrolledCourses.filter(c => c.id !== course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
      setIsEnrolled(false);
    } else {
      // Add to enrolled courses
      const courseToEnroll = {
        id: course.id,
        name: course.name,
        categoryPath: `/categories/${course.tags?.[0] || 'all'}`,
        slug: course.slug
      };
      enrolledCourses.push(courseToEnroll);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      
      // Initialize progress if not already set
      if (!localStorage.getItem(`progress_${course.id}`)) {
        localStorage.setItem(`progress_${course.id}`, '0');
      }
      
      setIsEnrolled(true);
    }
    
    // Dispatch a custom event to notify that enrollment has changed
    window.dispatchEvent(new Event('courseEnrollmentChanged'));
  };

  const getProgressColor = () => {
    if (progress >= 100) return 'bg-green-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer relative">
      <div className="relative overflow-hidden">
        <Image
          src={course?.banner?.url}
          width={500}
          height={150}
          alt="Course Banner"
          className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
        />
        {course?.free && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold transform transition-transform group-hover:scale-110">
            FREE
          </div>
        )}
        {!course?.free && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold transform transition-transform group-hover:scale-110">
            PREMIUM
          </div>
        )}
        
        {/* Enrollment Button */}
        <button 
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isEnrolled ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleEnrollment}
        >
          {isEnrolled ? <Minus size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
        </button>
      </div>
      
      <div className="p-4 transition-colors duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 dark:text-white">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {course.name}
          </h2>
          
          {isEnrolled && progress === 100 && (
            <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full">
              <Check size={16} className="text-green-500 dark:text-green-400" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <Image 
            src='/video.png' 
            alt='Video icon' 
            width={20}
            height={20}
            className="transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {course?.free ? 'Free Course' : 'Paid Course'}
          </span>
        </div>
        
        {/* Progress bar for enrolled courses */}
        {isEnrolled && showProgress && (
          <>
            <div className="mt-3 h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColor()} transition-all duration-700 ease-in-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">{progress}% complete</span>
              <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors duration-300">
                {progress > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          </>
        )}
      </div>
      
      {isEnrolled && (
        <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
}

export default CourseItem;




