'use client'

import React from 'react'
import { prisma } from "@/app/lib"
import { useState } from 'react'
import LikeButton from './LikeButton'
import useSWR from 'swr'
import Loading from '../ui/Loading'
import PostFooterSkeleton from '../ui/PostFooterSkeleton'
import { CommentList, LikeList, Post } from '@/app/lib/types'
import Link from 'next/link'

type IPostFooter = {
  post: Post
  id: string
}

// Helper function to fetch data from Prisma
const fetchLikes = async (postId: string) => {
  return await prisma.like.count({
    where: { postId },
  })
}

const fetchComments = async (postId: string) => {
  return await prisma.comment.count({
    where: { postId },
  })
}

const checkIsLiked = async (postId: string, profileId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      postId,
      ProfileId,
    },
  })
  return like ? true : false
}

function PostFooter({ post, id }: IPostFooter) {
  // Fetch total likes and comments from Prisma
  const { data: totalLikes, error: likesError } = useSWR(
    `likes-count-${post.id}`,
    () => fetchLikes(post.id),
  )

  const { data: totalComments, error: commentsError } = useSWR(
    `comments-count-${post.id}`,
    () => fetchComments(post.id),
  )

  // Fetch if the post is liked by the current user
  const { data: isLiked, error: likedError } = useSWR(
    `is-liked-${post.id}`,
    () => checkIsLiked(post.id, id), // Pass in postId and profileId (user id)
  )

  // Handle loading state
  if (!totalLikes || !totalComments || isLiked === undefined) {
    return (
      <div className="absolute left-6 bottom-14 z-10 s:bottom-6">
        <PostFooterSkeleton />
      </div>
    )
  }

  return (
    <div className="absolute bottom-0 w-full p-6 pb-12 text-white bg-gradient-to-t from-custom-shadow sm:pb-6 ">
      <Link href={`/posts/${post.id}`}>
        <p className="py-4">{post.caption}</p>
      </Link>
      <div className="flex gap-4 items-center">
        <LikeButton
          totalLikes={totalLikes}
          liked={isLiked}
          postId={post.id}
          id={id} // Current user ID
        />
        <Link href={`/posts/${post.id}/comments`}>
          <p>{totalComments} Comments</p>
        </Link>
      </div>
    </div>
  )
}

export default PostFooter
