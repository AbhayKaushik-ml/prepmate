import React, { useState } from 'react'
import Image from 'next/image';

export function SelectOption({selectedStudyType = () => {}}) {
    const Options = [
        {
            name: 'Exam',
            icon:'/exam_1.png',
        },
        {
            name: 'Job Interview',
            icon:'/job.png',
        },
        {
            name: 'Practice',
            icon:'/practice.png',
        },
        {
            name: 'Coding Prep',
            icon:'/code.png',
        },
        {
            name: 'Other',
            icon:'/knowledge.png',
        },

    ]
    const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className='text-center mb-2 text-lg'>Select from below</h2>
      <div className='grid grid-cols-3 lg:grid-cols-5 gap-5'>
        {Options.map((option, index) => (
            <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl 
            hover:border-primary cursor-pointer ${option?.name == selectedOption &&'border-primary'}`} 
            onClick={() => {
                setSelectedOption(option.name);
                if (typeof selectedStudyType === 'function') {
                    selectedStudyType(option.name);
                }
            }}>
                <Image src={option.icon} alt={option.name} width={100} height={100} />
                <h2 className='text-center text-sm mt-2'>{option.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}
