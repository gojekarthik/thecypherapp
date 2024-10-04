"use client";

import { useRouter } from "next/navigation";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import Player from "../Player/Player";
import { Post } from "@/app/lib/types";
import { prisma } from "@/app/lib"; // Ensure correct path to your Prisma instance
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "@/states/atoms/userAtoms";


async function PostCard({ post ,videoUrl }: { post: any , videoUrl:string }) {
  const router = useRouter();
  const user = useRecoilValue(userDetailsAtom);


  // Handle post deletion
  const handleDelete = async () => {
    try {
      await prisma.post.delete({
        where: { postId: post.id },  // Assumes postId is the primary key
      });
      // Redirect to profile after deletion
    } catch (e) {
      console.error("Error deleting post:", e);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center overflow-hidden shadow-2xl relative mx-[-16px] sm:mx-0 sm:rounded-3xl sm:max-h-[720px]">
      <PostHeader user={user} />
      {videoUrl ? (
        <Player videoUrl={videoUrl} />
      ) : (
        <p>Loading video...</p>
      )}
      <PostFooter id={post.profile || ""} post={post} />
    </div>
  );
}

export default PostCard;
