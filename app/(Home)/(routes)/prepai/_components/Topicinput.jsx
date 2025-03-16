import React from 'react'

export function Topicinput({setTopic, setDifficultyLevel}) {
  return (
    <div className='mt-10 w-full flex flex-col gap-4'>
      <h2>Enter the topic or paste the content</h2>
      <textarea
        placeholder="Start writing here..."
        className="mt-2 w-full p-2 border rounded-md resize-none min-h-[120px]"
        onChange={(event) => setTopic(event.target.value)}
      />
      <h2 className='mt-5 mb-3'>Select Difficulty Level</h2>
      <select 
        className="w-full p-2 border rounded-md"
        onChange={(e) => setDifficultyLevel(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>--select--</option>
        <option value="Easy">Easy</option>
        <option value="Moderate">Moderate</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}
