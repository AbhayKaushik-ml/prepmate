'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import SideBarNav from '../../../(Home)/_components/SideBarNav'
import { ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react'

function ViewNotes() {
  const { courseId } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [course, setCourse] = useState(null)
  const [notes, setNotes] = useState([])
  const [currentChapter, setCurrentChapter] = useState(0)

  // Fetch course data and notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch course data
        let courseResult
        try {
          courseResult = await axios.get(`/api/courses?courseId=${courseId}`)
          if (courseResult?.data?.result) {
            setCourse(courseResult.data.result)
          } else if (courseResult?.data?.resourse) {
            // Handle the current API response format
            setCourse(courseResult.data.resourse)
          } else if (courseResult?.data) {
            setCourse(courseResult.data)
          }
          
          // After setting course data, fetch notes
          try {
            const notesResult = await axios.get(`/api/courseNotes?courseId=${courseId}`)
            console.log('Notes API response:', notesResult?.data)
            
            if (notesResult?.data && Array.isArray(notesResult.data)) {
              setNotes(notesResult.data)
            } else if (notesResult?.data) {
              // Try to handle non-array response
              const dataArray = [notesResult.data].flat().filter(Boolean)
              setNotes(dataArray)
            } else {
              throw new Error('Invalid data format from API')
            }
          } catch (notesError) {
            console.error('Failed to fetch notes:', notesError)
            
            // Create mock notes based on the fetched course data
            generateMockNotes(courseResult?.data?.resourse || courseResult?.data?.result || courseResult?.data)
          }
        } catch (courseError) {
          console.error('Failed to fetch course data:', courseError)
          // Create mock course for development
          const mockCourse = {
            title: "Sample Course",
            courseLayout: {
              chapters: [
                {
                  chapter_title: "Introduction",
                  chapter_summary: "This is an introduction to the mock course."
                },
                {
                  chapter_title: "Getting Started",
                  chapter_summary: "Let's get started with the basics."
                }
              ]
            }
          }
          setCourse(mockCourse)
          
          // Generate mock notes for mock course
          generateMockNotes(mockCourse)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load course notes. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    // Helper function to generate mock notes based on course data
    const generateMockNotes = (courseData) => {
      const mockNotes = []
      
      // Generate a mock note for each chapter in the course
      if (courseData?.courseLayout?.chapters) {
        courseData.courseLayout.chapters.forEach((chapter, index) => {
          mockNotes.push({
            chapter_id: index,
            title: chapter.chapter_title || `Chapter ${index + 1}`,
            content: `<h2>${chapter.chapter_title || 'Chapter Notes'}</h2>
              <p>${chapter.chapter_summary || 'No summary available for this chapter.'}</p>
              <p>This is mock content created because the API is still in development or returned an error.</p>
              ${index === 0 ? 
                '<h3>Introduction</h3><p>Welcome to this course! This section provides an overview of what you will learn.</p>' : 
                '<h3>Key Concepts</h3><ul><li>Concept 1</li><li>Concept 2</li><li>Concept 3</li></ul>'
              }`
          })
        })
      } else {
        // Fallback if no chapters are found
        mockNotes.push({
          chapter_id: 0,
          title: "Introduction",
          content: "<h2>Introduction to the Course</h2><p>This is sample note content for the introduction chapter. It includes the basic concepts and an overview of what you'll learn.</p><p>You can explore this material at your own pace.</p>"
        })
        mockNotes.push({
          chapter_id: 1,
          title: "Getting Started",
          content: "<h2>Getting Started with the Basics</h2><p>This chapter covers the fundamental concepts you need to understand before moving forward.</p><ul><li>Basic concept 1</li><li>Basic concept 2</li><li>Basic concept 3</li></ul>"
        })
      }
      
      setNotes(mockNotes)
    }

    if (courseId) {
      fetchData()
    }
  }, [courseId])

  // Navigate to previous chapter
  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  // Navigate to next chapter
  const goToNextChapter = () => {
    const totalChapters = course?.courseLayout?.chapters?.length || 0
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  // Function to convert plain text with newlines to HTML
  const formatContentToHtml = (content) => {
    if (!content) return '<p>No content available</p>';
    
    // Check if content already has HTML tags
    if (content.includes('<h1>') || content.includes('<p>') || content.includes('<div>')) {
      return content; // Already HTML formatted
    }
    
    // Special handling for JSON objects that were stringified
    if (typeof content === 'string' && content.includes('"content":')) {
      try {
        const parsedContent = JSON.parse(content);
        if (parsedContent.content) {
          content = parsedContent.content;
        }
      } catch (e) {
        // Continue with original content if parsing fails
        console.log('Error parsing JSON string:', e);
      }
    }

    // Process plain text with newlines
    let formattedContent = content;
    
    // First, identify and mark list items
    // Look for lines that start with "- ", "* ", "• ", or numbered patterns like "1. ", "2. "
    formattedContent = formattedContent.replace(/^([\s]*[-•*][\s]+)(.+)$/gm, '<li>$2</li>');
    formattedContent = formattedContent.replace(/^([\s]*\d+\.[\s]+)(.+)$/gm, '<li>$2</li>');
    
    // Handle parenthetical lists like "Stacks (LIFO principle, push, pop, peek)"
    // This pattern looks for lines with a title followed by a parenthesized list
    formattedContent = formattedContent.replace(/^(.+)\s\((.+)\)$/gm, (match, title, listContent) => {
      const listItems = listContent.split(', ').map(item => `<li>${item.trim()}</li>`).join('');
      return `<h3>${title}</h3><ul>${listItems}</ul>`;
    });
    
    // Group consecutive <li> elements into <ul> or <ol> lists
    // First, temporarily mark list item boundaries
    formattedContent = formattedContent.replace(/<\/li>\n<li>/g, '</li>LIST_ITEM_BOUNDARY<li>');
    
    // Now wrap consecutive list items in <ul> tags
    formattedContent = formattedContent.replace(/(<li>.*?<\/li>)(?!LIST_ITEM_BOUNDARY)/gs, '<ul>$1</ul>');
    
    // Clean up the temporary markers
    formattedContent = formattedContent.replace(/LIST_ITEM_BOUNDARY/g, '\n');
    
    // Process regular paragraphs
    // Replace multiple newlines with paragraph breaks
    formattedContent = formattedContent.replace(/\n\n+/g, '</p><p>');
    
    // Replace single newlines with breaks (but not within lists)
    formattedContent = formattedContent.replace(/\n(?!<\/?[uo]l|<li>)/g, '<br />');
    
    // Identify and format headings
    const lines = formattedContent.split('</p><p>');
    const processedLines = lines.map(line => {
      // Skip if the line already contains HTML tags
      if (line.includes('<ul>') || line.includes('<li>') || line.includes('<h')) {
        return line;
      }
      
      // If line is short and doesn't have punctuation, treat as heading
      if (line.length < 100 && 
          !line.includes('.') && 
          !line.includes(',') && 
          !line.includes(':') && 
          line.trim().length > 0) {
        
        // Clean the heading text of any HTML tags or line breaks
        const headingText = line.replace(/<br \/>/g, ' ').replace(/<[^>]*>/g, '').trim();
        
        if (headingText) {
          // If text looks like a main title (very short, all caps or first word capitalized)
          if (headingText.length < 30 && (
              headingText === headingText.toUpperCase() || 
              /^[A-Z][a-z]/.test(headingText)
          )) {
            return `<h2 class="text-center text-xl font-bold text-blue-700 mt-6 mb-4">${headingText}</h2>`;
          } else {
            return `<h3 class="font-semibold text-lg text-blue-600 mt-4 mb-2">${headingText}</h3>`;
          }
        }
      }
      return line;
    });
    
    // Join everything back together
    formattedContent = processedLines.join('</p><p>');
    
    // Clean up any broken/nested paragraph tags
    formattedContent = formattedContent.replace(/<p><\/p>/g, '');
    formattedContent = formattedContent.replace(/<p><p>/g, '<p>');
    formattedContent = formattedContent.replace(/<\/p><\/p>/g, '</p>');
    
    // Wrap the content in paragraph tags if it doesn't start with an HTML tag
    if (!formattedContent.trim().startsWith('<')) {
      formattedContent = '<p>' + formattedContent;
    }
    
    // Ensure the content ends with a closing paragraph tag if it doesn't end with a tag
    if (!formattedContent.trim().endsWith('>')) {
      formattedContent = formattedContent + '</p>';
    }
    
    return formattedContent;
  };

  // Find current chapter note
  const currentNote = notes.find(note => note.chapter_id === currentChapter) || notes[0];
  
  // Format the note content as HTML if it exists
  const formattedNoteContent = currentNote ? formatContentToHtml(currentNote.content) : '';

  if (loading) {
    return (
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
            <div className="h-64 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    )
  }

  const totalChapters = course?.courseLayout?.chapters?.length || 0
  const chapterTitle = course?.courseLayout?.chapters?.[currentChapter]?.chapter_title || 'Chapter Notes'

  return (
    <div>
      {/* Main Sidebar Nav */}
      <div className='h-full w-64 flex-col fixed inset-y-0 z-50'>
        <SideBarNav />
      </div>

      {/* Main Content */}
      <div className="ml-64 bg-gray-50 min-h-screen pb-12">
        <div className="container mx-auto px-4 py-6">
          {/* Back navigation */}
          <div className="mb-6">
            <Link href={`/course/${courseId}`} className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Course</span>
            </Link>
          </div>

          {/* Course title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{course?.title || 'Course Notes'}</h1>
          </div>

          {/* Horizontal Chapter Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={goToPreviousChapter} 
                disabled={currentChapter === 0}
                className={`p-2 rounded-full ${
                  currentChapter === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex-1 mx-2 overflow-x-auto">
                <div className="flex space-x-1">
                  {course?.courseLayout?.chapters?.map((chapter, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentChapter(index)}
                      className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                        currentChapter === index 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Chapter {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={goToNextChapter} 
                disabled={currentChapter >= totalChapters - 1}
                className={`p-2 rounded-full ${
                  currentChapter >= totalChapters - 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Chapter Title and Info */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center">
              <BookOpen className="text-blue-600 mr-3" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{chapterTitle}</h2>
                <p className="text-gray-500 text-sm">
                  Chapter {currentChapter + 1} of {totalChapters}
                </p>
              </div>
            </div>
          </div>

          {/* Notes Content with Enhanced Styling */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            {currentNote ? (
              <div>
                <div 
                  className="prose prose-blue lg:prose-lg max-w-none
                             prose-headings:font-bold prose-h2:text-blue-700 prose-h2:text-xl prose-h2:text-center prose-h2:mt-6 prose-h2:mb-4
                             prose-h3:text-blue-600 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2
                             prose-p:text-gray-700 prose-p:my-3 prose-p:leading-relaxed
                             prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                             prose-strong:font-bold prose-strong:text-gray-800
                             prose-img:rounded-lg prose-img:mx-auto
                             prose-ul:pl-6 prose-ul:my-4 prose-li:my-1 prose-li:text-gray-700
                             prose-ol:pl-6 prose-ol:my-4
                             prose-pre:bg-gray-50 prose-pre:rounded prose-pre:p-3
                             prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 
                             prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formattedNoteContent }} 
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600">No notes available for this chapter.</p>
                <p className="text-gray-500 text-sm mt-2">Check back later or try another chapter.</p>
              </div>
            )}
          </div>
          
          {/* Chapter Navigation Bottom */}
          <div className="flex justify-between">
            <button 
              onClick={goToPreviousChapter}
              disabled={currentChapter === 0}
              className={`px-4 py-2 rounded flex items-center ${
                currentChapter === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous Chapter
            </button>
            
            <button 
              onClick={goToNextChapter}
              disabled={currentChapter >= totalChapters - 1}
              className={`px-4 py-2 rounded flex items-center ${
                currentChapter >= totalChapters - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              Next Chapter
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNotes
