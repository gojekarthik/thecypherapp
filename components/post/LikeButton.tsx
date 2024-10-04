'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { prisma } from '@/app/lib'
import { useSWRConfig } from 'swr'
import { api_url } from '@/utils/const'
import Link from 'next/link'
import { Heart, HeartOffIcon } from 'lucide-react'

type ILikdButton = {
  liked: Boolean
  postId: string
  id: string
  totalLikes: number
}

function LikeButton({ liked, postId, id, totalLikes }: ILikdButton) {
  const { mutate } = useSWRConfig()
  const [isLiked, setIsLiked] = useState(liked)
  const [likes, setLikes] = useState(totalLikes)
  const router = useRouter()

  // Replace pb.authStore.model with session-based user model (if you're using NextAuth or a similar session method)
  const session = { userId: id } // Assuming you're passing the user ID

  const addLike = async () => {
    if (!session.userId) {
      router.replace('/account/login')
      return
    }

    try {
      await prisma.like.create({
        data: {
          postId: postId,
          ProfileId: session.userId,
        },
      })
    } catch (e) {
      console.error("Error adding like:", e)
    }
  }

  const deleteLike = async () => {
    try {
      // Find the like by postId and profileId, then delete it
      const like = await prisma.like.findFirst({
        where: {
          postId: postId,
          ProfileId: session.userId,
        },
      })
      if (like) {
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        })
      }
    } catch (e) {
      console.error("Error deleting like:", e)
    }
  }

  const toggleLike = async () => {
    if (!isLiked) {
      await addLike()
      setLikes(likes + 1)
    } else {
      await deleteLike()
      setLikes(likes - 1)
    }
    setIsLiked(!isLiked)

    // Mutate the SWR cache to update the like count
    await mutate(`${api_url}collections/likes/records?filter=(post='${postId}')`, true)
    await mutate(`${api_url}collections/likes/records?filter=post='${postId}'&profile='${session.userId}'`, true)
  }

  return (
    <div className="flex gap-1 p-3 px-4 pr-5 rounded-full bg-zinc-200 bg-opacity-30 backdrop-blur-sm">
      {isLiked ? (
        <button onClick={toggleLike}>
          <Heart className="text-red-600" width={24} height={24} />
        </button>
      ) : (
        <button onClick={toggleLike}>
          <HeartOffIcon width={24} height={24} />
        </button>
      )}
      <Link href={`/posts/${postId}/likes`}>
        <p>{likes} Likes </p>
      </Link>
    </div>
  )
}

export default LikeButton
