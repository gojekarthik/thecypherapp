"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayIcon, PauseIcon, StopCircleIcon } from "lucide-react"

export default function DanceMetronome() {
  const [isRunning, setIsRunning] = useState(false)
  const [count, setCount] = useState(1)
  const [bpm, setBpm] = useState(120)
  const [practiceTime, setPracticeTime] = useState(1) // in minutes
  const [remainingTime, setRemainingTime] = useState(practiceTime * 60)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContext = useRef<AudioContext | null>(null)

  // Initialize AudioContext once
  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return () => {
      audioContext.current?.close()
    }
  }, [])

  const playClick = () => {
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(count === 1 ? 1000 : 800, audioContext.current.currentTime)
      
      const gainNode = audioContext.current.createGain()
      gainNode.gain.setValueAtTime(1, audioContext.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.1)
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)
      
      oscillator.start()
      oscillator.stop(audioContext.current.currentTime + 0.1)
    }
  }

  const startMetronome = () => {
    if (!isRunning) {
      setIsRunning(true)
      setRemainingTime(practiceTime * 60)
      const interval = (60 / bpm) * 1000
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 8) + 1
          playClick()
          return newCount
        })
        setRemainingTime((prevTime) => {
          const newTime = prevTime - (interval / 1000)
          if (newTime <= 0) {
            stopMetronome()
            return 0
          }
          return newTime
        })
      }, interval)
    }
  }

  const stopMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setCount(1)
    setRemainingTime(practiceTime * 60)
  }, [practiceTime])

  const toggleMetronome = () => {
    isRunning ? stopMetronome() : startMetronome()
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (!isRunning) {
      setRemainingTime(practiceTime * 60) // Reset the time when practice time changes and the metronome is not running
    }
  }, [practiceTime, isRunning])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Dance Metronome</CardTitle>
      </CardHeader>
      <div className="flex">
        <CardContent className="space-y-4">
          <div>
            <div className="text-center">
              <motion.div
                key={count}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-6xl font-bold"
              >
                {count}
              </motion.div>
              <div className="text-xl mt-2">{formatTime(remainingTime)}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bpm">Tempo (BPM)</Label>
              <Slider
                id="bpm"
                min={60}
                max={240}
                step={1}
                value={[bpm]}
                onValueChange={(value) => setBpm(value[0])}
              />
              <div className="text-center">{bpm} BPM</div>
            </div>
          </div>
          <div></div>
        </CardContent>
        
        <CardFooter className="grid justify-center space-x-2">
          <div className="space-y-2">
            <Label htmlFor="practiceTime">Practice Time (minutes)</Label>
            <Input
              id="practiceTime"
              type="number"
              min={1}
              value={practiceTime}
              onChange={(e) => setPracticeTime(Number(e.target.value))}
            />
          </div>
          <div className="flex">
            <Button className="bg-[#8661C1]" onClick={toggleMetronome}>
              {isRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </Button>
            <Button onClick={stopMetronome} variant="outline">
              <StopCircleIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}