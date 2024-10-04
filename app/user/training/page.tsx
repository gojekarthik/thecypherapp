import DanceMetronome from '@/components/metronome'
import TrainingGenerator from '@/components/promptGenerator'
import React from 'react'

const Training = () => {
    return <div className='flex h-1/2 mt-32 w-4/5 border border-r-2'>
    <TrainingGenerator />
    <DanceMetronome />
  </div>
}

export default Training