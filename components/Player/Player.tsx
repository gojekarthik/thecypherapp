'use client'
import { PauseIcon, PlayIcon } from 'lucide-react'
import React, { RefObject, useRef, useState } from 'react'
import { InView } from 'react-intersection-observer'

function Player({ videoUrl }: { videoUrl: string }) {
  const [playing, setPlaying] = useState(false)
  const vidRef = useRef() as RefObject<HTMLVideoElement>

  const handlePlayPause = async () => {
    if (vidRef.current) {
      if (playing) {
        vidRef.current.pause();
        setPlaying(false);
      } else {
        try {
          await vidRef.current.play(); // Attempt to play the video
          setPlaying(true);
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    }
  }

  return (
    <InView
      className="h-full"
      onChange={(inView) => {
        if (inView && playing) {
          handlePlayPause(); 
        }
      }}
    >
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"> {/* Fullscreen container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <video
            ref={vidRef}
            src={videoUrl}
            loop
            muted={!playing} // Mute the video if not playing
            className="w-full h-full object-cover" // Cover the full area
          />
        </div>

        <button
          onClick={handlePlayPause}
          className="absolute z-20 right-8 bottom-16 text-white sm:bottom-8 p-2 rounded-full opacity-70 hover:opacity-100 transition"
        >
          {playing ? (
            <PauseIcon width={32} height={32} />
          ) : (
            <PlayIcon width={32} height={32} />
          )}
        </button>
      </div>
    </InView>
  )
}

export default Player;
