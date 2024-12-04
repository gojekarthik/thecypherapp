"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "./loading";



export default function UserHome() {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
   
    if (session.status === "unauthenticated") {
      console.log("user not logged in")
      router.push('/auth');
    }
  }, [session.status, router]);

  if (session.status === 'loading') {
    return <Loading />;
  }

  if (session) {
    return (
    <div>hello</div>
    );
  }

  return null; 
}

