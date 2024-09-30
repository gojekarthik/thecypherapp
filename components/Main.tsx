import { mainNavigationAtom } from '@/states/atoms/mainComponentAtom'
import React from 'react'
import { useRecoilValue } from 'recoil'
import TrainingGenerator from './promptGenerator'
import DanceMetronome from './metronome'

const Main : React.FC = () => {
  const mainComponent = useRecoilValue(mainNavigationAtom)
  if(mainComponent==="Training Session"){
    return <div className='flex h-1/2 mt-32 w-4/5 border border-r-2'>
    <TrainingGenerator />
    <DanceMetronome />
  </div>
  }
  return (
    <div className='h-screen w-4/5 border border-r-2'>
      {mainComponent} coming soon..
    </div>
  )
}

export default Main