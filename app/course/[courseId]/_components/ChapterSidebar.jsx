'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const ChapterSidebar = ({ course }) => {
  const { courseId } = useParams();
  const [activeChapter, setActiveChapter] = useState(0);
  
  if (!course || !course.courseLayout || !course.courseLayout.chapters) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  const chapters = course.courseLayout.chapters;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <h2 className="text-white font-bold text-lg">Course Contents</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {chapters.map((chapter, index) => (
          <div 
            key={index}
            className={`transition-all duration-200 ${activeChapter === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <Link 
              href={`/course/${courseId}/chapters/${index + 1}`}
              className="block"
              onClick={() => setActiveChapter(index)}
            >
              <div className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${activeChapter === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className={`font-medium ${activeChapter === index ? 'text-blue-700' : 'text-gray-800'}`}>
                      {chapter.chapter_title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {chapter.chapter_summary.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Progress</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
          </div>
          <p className="text-xs mt-1 text-gray-500">1 of {chapters.length} chapters completed</p>
        </div>
      </div>
    </div>
  )
}

export default ChapterSidebar 