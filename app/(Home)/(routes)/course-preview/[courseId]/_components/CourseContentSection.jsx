import { Unlock, Play, CheckCircle, Circle } from "lucide-react";
import React, { useState, useEffect } from "react";

function CourseContentSection({ courseInfo, setActiveIndex }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  
  // Load completed chapters on mount
  useEffect(() => {
    if (!courseInfo?.id) return;
    
    const storedCompletedChapters = localStorage.getItem(`completed_chapters_${courseInfo.id}`);
    if (storedCompletedChapters) {
      setCompletedChapters(JSON.parse(storedCompletedChapters));
    }
  }, [courseInfo?.id]);
  
  // Update progress whenever completed chapters change
  useEffect(() => {
    if (!courseInfo?.id || !courseInfo?.chapter?.length) return;
    
    // Calculate progress percentage
    const progressPercentage = Math.round(
      (completedChapters.length / courseInfo.chapter.length) * 100
    );
    
    // Store progress in localStorage
    localStorage.setItem(`progress_${courseInfo.id}`, progressPercentage.toString());
    
    // Store completed chapters in localStorage
    localStorage.setItem(
      `completed_chapters_${courseInfo.id}`,
      JSON.stringify(completedChapters)
    );
    
    // Dispatch event to update UI elsewhere
    window.dispatchEvent(new Event('courseEnrollmentChanged'));
  }, [completedChapters, courseInfo]);
  
  // Toggle chapter completion
  const toggleChapterCompletion = (index, e) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    
    setCompletedChapters(prev => {
      if (prev.includes(index)) {
        return prev.filter(idx => idx !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-sm">
      <h2 className="font-semibold text-gray-800 dark:text-white mb-3">Contents</h2>
      {courseInfo?.chapter.map((item, id) => (
        <div key={id} className="relative mb-2">
          <div
            className={`p-2 text-[14px] flex justify-between items-center m-2
            border rounded-sm px-4 cursor-pointer dark:text-gray-200
            ${
              hoveredIndex === id 
                ? "bg-purple-600 text-white" 
                : completedChapters.includes(id)
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                  : "dark:border-gray-700"
            }`}
            onMouseEnter={() => setHoveredIndex(id)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(id)} // Call parent function on click
          >
            <span>{id + 1}. {item.name}</span>
            
            {/* Status icons */}
            <div className="flex items-center">
              <button 
                className={`mr-3 focus:outline-none ${
                  hoveredIndex === id ? "text-white" : completedChapters.includes(id) ? "text-green-500 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
                }`}
                onClick={(e) => toggleChapterCompletion(id, e)}
                title={completedChapters.includes(id) ? "Mark as incomplete" : "Mark as complete"}
              >
                {completedChapters.includes(id) ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              
              {hoveredIndex === id ? (
                <Play className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Progress indicator */}
      {courseInfo?.chapter?.length > 0 && (
        <div className="mt-4 p-3 border rounded-md dark:border-gray-700">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Course Progress</span>
            <span>
              {completedChapters.length}/{courseInfo.chapter.length} completed
              ({Math.round((completedChapters.length / courseInfo.chapter.length) * 100)}%)
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(completedChapters.length / courseInfo.chapter.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseContentSection;
