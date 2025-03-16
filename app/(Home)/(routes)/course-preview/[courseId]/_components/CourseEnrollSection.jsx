import React, { useState, useEffect } from 'react';
import Button from '@/app/(Home)/_components/Button';
import { Check, BookOpen, Award } from 'lucide-react';

function CourseEnrollSection({ courseInfo }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!courseInfo?.id) return;

    // Check if course is enrolled
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const enrolled = enrolledCourses.some(c => c.id === courseInfo.id);
    setIsEnrolled(enrolled);

    // Get progress
    const courseProgress = localStorage.getItem(`progress_${courseInfo.id}`);
    if (courseProgress) {
      setProgress(parseInt(courseProgress));
    }

    // Add listener for progress updates
    const handleProgressUpdate = () => {
      const updatedProgress = localStorage.getItem(`progress_${courseInfo.id}`);
      if (updatedProgress) {
        setProgress(parseInt(updatedProgress));
      }
    };

    window.addEventListener('courseEnrollmentChanged', handleProgressUpdate);

    return () => {
      window.removeEventListener('courseEnrollmentChanged', handleProgressUpdate);
    };
  }, [courseInfo?.id]);

  const handleEnrollment = () => {
    if (!courseInfo) return;

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    if (isEnrolled) {
      // Unenroll
      const updatedCourses = enrolledCourses.filter(c => c.id !== courseInfo.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
      setIsEnrolled(false);
      localStorage.removeItem(`progress_${courseInfo.id}`);
      localStorage.removeItem(`completed_chapters_${courseInfo.id}`);
      setProgress(0);
    } else {
      // Enroll
      const courseToEnroll = {
        id: courseInfo.id,
        name: courseInfo.name,
        categoryPath: `/categories/${courseInfo.tags?.[0] || 'all'}`,
        slug: courseInfo.slug
      };
      
      enrolledCourses.push(courseToEnroll);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      
      // Initialize progress if not already set
      if (!localStorage.getItem(`progress_${courseInfo.id}`)) {
        localStorage.setItem(`progress_${courseInfo.id}`, '0');
      }
      
      setIsEnrolled(true);
    }
    
    // Dispatch event to update UI elsewhere
    window.dispatchEvent(new Event('courseEnrollmentChanged'));
  };

  if (!courseInfo) {
    return (
      <div className='p-3 text-center rounded-md bg-white dark:bg-gray-800 animate-pulse flex flex-col gap-3'>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mx-auto"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3 mx-auto mt-2"></div>
      </div>
    );
  }

  return (
    <div className={`p-4 text-center rounded-md ${isEnrolled ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-purple-600'} flex flex-col gap-3 mb-4`}>
      {isEnrolled ? (
        // Enrolled view
        <>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Check size={20} className="text-green-600 dark:text-green-400" />
            <h2 className={`text-[20px] font-bold ${progress === 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
              {progress === 100 ? 'Course Completed!' : 'Currently Enrolled'}
            </h2>
          </div>
          
          {progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span>Your Progress</span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300 ease-in-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between gap-2">
            <button 
              onClick={handleEnrollment}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-md transition-colors flex-1 text-sm"
            >
              Unenroll
            </button>
            
            {progress === 100 ? (
              <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded-md transition-colors flex-1 text-sm flex items-center justify-center">
                <Award size={16} className="mr-1" />
                Completed
              </button>
            ) : (
              <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-md transition-colors flex-1 text-sm flex items-center justify-center">
                <BookOpen size={16} className="mr-1" />
                Continue
              </button>
            )}
          </div>
        </>
      ) : (
        // Not enrolled view
        <>
          <h2 className='text-[22px] font-bold text-white'>Enroll in the Course</h2>
          <h2 className='text-white text-opacity-90 text-sm'>
            {courseInfo.free ? 'Free course - start learning now!' : 'Premium course - unlock all content'}
          </h2>
          <div onClick={handleEnrollment}>
            <Button text={"Enroll Now"} />
          </div>
        </>
      )}
    </div>
  );
}

export default CourseEnrollSection;