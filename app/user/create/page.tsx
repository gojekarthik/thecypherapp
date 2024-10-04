"use client"
import CreatePost from '@/components/post/create/CreatePost'
import { useSession } from 'next-auth/react'
import React from 'react'

function Page() {
  useSession()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-200 rounded-3xl overflow-hidden max-w-2xl mx-auto md:max-w-4xl lg:max-w-6xl p-4">
        <CreatePost />
      </div>
    </div>
  )
}

export default Page
