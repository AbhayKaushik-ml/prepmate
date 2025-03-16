"use client"
import React, { useState } from 'react'
import { SelectOption } from './_components/SelectOption'
// import Button from '@/app/(Home)/_components/Button'
import { Topicinput } from './_components/Topicinput';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function prepai() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUser();

    const router = useRouter();

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData(prev => ({...prev, [fieldName]: fieldValue}));
        console.log('Updated form data:', {...formData, [fieldName]: fieldValue});
    }

    /** Used to generate course outline */
    const GenerateCourseOutline = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Validate required fields
            if (!formData.studyType || !formData.topic || !formData.difficultyLevel) {
                setError('Please fill in all required fields');
                return;
            }

            const courseId = uuidv4();
            console.log('Sending request with data:', {
                courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress
            });

            const result = await axios.post('/api/generate-course-outline', {
                courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress
            });

            console.log('Course outline generated:', result.data.result.resp);
            // Handle success - you might want to redirect or show a success message
        } catch (error) {
            console.error('Failed to generate course outline:', error);
            setError(error.response?.data?.error || 'Failed to generate course outline');
        } finally {
            setIsLoading(false);
            router.replace('/dashboard');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center p-5 md:px-24 lg:px-36'>
            <h2 className='text-primary text-3xl font-bold'>Start Building Your Personalized Study Material</h2>
            <p className='text-gray-500 text-sm'>Fill in the details below to create your own personalized study material</p>
            
            {error && (
                <div className='mt-4 p-4 bg-red-100 text-red-700 rounded-md'>
                    {error}
                </div>
            )}
            
            <div className='mt-10'>
                {step === 0 ? (
                    <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)}/>
                ) : (
                    <Topicinput 
                        setTopic={(value) => handleUserInput('topic', value)}
                        setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
                    />
                )}
            </div>
            
            <div className='flex justify-between w-full mt-32'>
                {step !== 0 ? (
                    <button 
                        onClick={() => setStep(step-1)}
                        className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
                        disabled={isLoading}
                    >
                        Previous
                    </button>
                ) : (
                    <div>-</div>
                )}
                
                {step === 0 ? (
                    <button 
                        onClick={() => setStep(step+1)}
                        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                        disabled={!formData.studyType}
                    >
                        Next
                    </button>
                ) : (
                    <button 
                        onClick={GenerateCourseOutline}
                        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300'
                        disabled={isLoading || !formData.topic || !formData.difficultyLevel}
                    >
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default prepai
