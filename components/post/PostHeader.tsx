import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "@/states/atoms/userAtoms";


function PostHeader({ user }: { user: any }) {
  const userDetails = useRecoilValue(userDetailsAtom);
  return (
    <div className=" z-10 drop-shadow-sm absolute top-0 text-white p-6 flex gap-2 items-center w-full bg-gradient-to-b from-custom-shadow">
      <div className="flex gap-2 items-center flex-grow">
        <Avatar>
          <AvatarImage src={userDetails.image} alt="User's profile picture" />
          <AvatarFallback>{userDetails.name[0]}</AvatarFallback>
        </Avatar>
        {user.name}
      </div>
    </div>
  );
}

export default PostHeader;
