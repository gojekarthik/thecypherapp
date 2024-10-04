import React from 'react'
import PostCard from '@/components/post/PostCard'
import { prisma } from '@/app/lib'



type PageProps = {
  params: {
    id: string
  }
  children?: React.ReactNode
}

async function layout({ params, children }: PageProps) {
  const { id } = params


  const post = await prisma.post.findUnique({
    where: {
      postId:id
    },
  })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="grid grid-cols-1 grid-flow-row rounded-3xl border border-zinc-200 sm:grid-cols-2 mt-4">
      <div className="overflow-hidden rounded-3xl max-h-screen h-[820px]">
        <PostCard post={post} videoUrl={post.fileUrl}/>
      </div>
      <div className="flex-grow pt-8 p-4 sm:p-8 s:pt-0">{children}</div>
    </div>
  )
}

export default layout
