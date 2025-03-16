import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Stethoscope, StethoscopeIcon } from 'lucide-react'
  
export function Topicinput({setTopic,setDifficultyLevel}) {
  return (
    <div className='mt-10 w-fullflex flex-col gap-4'>
      <h2>Enter the topic or paste the content</h2>
      <Textarea
        placeholder="Start writing here..."
        className="mt-2 w-full" onChange={(event)=>setTopic(event.target.value)}
      />
      <h2 className='mt-5 mb-3'>Select Difficulty Level</h2>
        <Select onValueChange={(value)=>setDifficultyLevel(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="--select--" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
        </Select>

    </div>
  )
}
