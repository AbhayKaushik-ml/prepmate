'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function StudyMaterialSection() {
    const { courseId } = useParams();

    const MaterialList = [
        {
            name: "Notes",
            desc: "Access comprehensive notes for each chapter",
            icon: "/icons/notes-icon.svg",
            svgFallback: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            path: `/course/${courseId}/notes`,
            status: "Available",
        },
        {
            name: "Flashcards",
            desc: "Practice with interactive flashcards",
            icon: "/icons/flashcard-icon.svg",
            svgFallback: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            path: `/course/${courseId}/flashcards`,
            status: "Available",
        },
        {
            name: "Quiz",
            desc: "Test your knowledge with quizzes",
            icon: "/icons/quiz-icon.svg",
            svgFallback: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            path: `/course/${courseId}/quiz`,
            status: "Available",
        },
        {
            name: "Summary",
            desc: "Review condensed summaries of key concepts",
            icon: "/icons/summary-icon.svg",
            svgFallback: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            path: `/course/${courseId}/summary`,
            status: "Available",
        }
    ];

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Study Materials</h2>
                <span className="text-sm text-blue-600">All materials ready</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MaterialList.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full">
                            <div className="p-4 flex flex-col h-full">
                                <div className="bg-blue-50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-3">
                                    {item.svgFallback}
                                </div>
                                
                                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                                
                                <div className="mt-auto flex items-center">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        item.status === "Available" 
                                            ? "bg-green-100 text-green-700" 
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default StudyMaterialSection
