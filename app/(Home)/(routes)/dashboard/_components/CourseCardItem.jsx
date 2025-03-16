"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import  useParams  from 'next/navigation'

function CourseCardItem({ course, onStatusChange }) {
  const router = useRouter()
  const [status, setStatus] = useState(course.status || 'New')
  const [isLoading, setIsLoading] = useState(false)

  // Update local state when course prop changes
  useEffect(() => {
    setStatus(course.status || 'New')
  }, [course.status])

  const handleViewCourse = () => {
    router.push(`/course/${course.courseId}`)
  }

  const handleGenerateNotes = async () => {
    try {
      setIsLoading(true)
      setStatus('Generating')
      
      // Call the API to generate notes
      const response = await axios.post('/api/generate-notes', {
        courseId: course.courseId
      })
      
      console.log('Generate notes response:', response.data)
      
      // Update the status based on the response
      if (response.data.success) {
        setStatus('Ready')
      }
      
      // Notify parent component to refresh the list
      if (onStatusChange) {
        onStatusChange()
      }
    } catch (error) {
      console.error('Failed to generate notes:', error)
      setStatus('Failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Debug output
  console.log(`CourseCardItem for ${course.courseId}: status=${status}, isLoading=${isLoading}`)

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className='flex justify-between items-center'>
          <Image src={'/knowledge.png'} alt='other' width={50} height={50}/>
          <h2 className='text-[10px] p-1 px-2'> 20 Dec 2024</h2>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            {course.courseLayout?.course_title || course.topic}
          </h3>
        </div>
        <p className="text-gray-600 text-xs line-clamp-2">
          {course?.courseLayout?.course_summary}
        </p>
        
        <div className='mt-4 flex justify-end'>
          {(status === 'Generating' || isLoading) ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary mr-2"></div>
              <h2 className='text-[12px] p-1 px-2 rounded-full bg-gray-400'>Generating...</h2>
            </div>
          ) : status === 'Ready' ? (
            <Link href={'/course/'+course?.courseId}><button 
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleViewCourse}
          >
            View Course
          </button></Link>
          ) : status === 'Failed' ? (
            <div className="w-full flex flex-col">
              <div className="text-[12px] p-1 px-2 rounded-full bg-red-200 text-red-800 mb-2 text-center">
                Generation failed
              </div>
              <button 
                className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                onClick={handleGenerateNotes}
                disabled={isLoading}
              >
                Retry
              </button>
            </div>
          ) : (
            <button 
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={handleGenerateNotes}
              disabled={isLoading}
            >
              Generate Notes
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCardItem
