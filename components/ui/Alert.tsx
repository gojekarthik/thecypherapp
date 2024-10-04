'use client'
import React, { useState } from 'react'
import { CrossIcon } from 'lucide-react'
function Alert({ message }: { message?: string }) {
  const [isVisible, setIsVisible] = useState(true)
  return isVisible ? (
    <div className="flex items-center gap-4 text-center p-4 text-sm text-gray-200 bg-zinc-900 fixed top-4 left-1/2 -translate-x-1/2 rounded-md shadow-lg">
      {message}
      <div className="w-[1px] h-3 bg-zinc-700"></div>
      <button onClick={() => setIsVisible(false)}>
        <CrossIcon width={16} height={16} />
      </button>
    </div>
  ) : (
    <></>
  )
}

export default Alert
