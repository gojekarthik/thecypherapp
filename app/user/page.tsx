"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


import { useRecoilState } from "recoil";
import { userDetailsAtom } from "@/states/atoms/userAtoms";
import Loading from "./loading";



export default function UserHome() {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
   
    if (status === "unauthenticated") {
      console.log("user not logged in")
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (session) {
    return (
    <div>hello</div>
    );
  }

  return null; 
}

