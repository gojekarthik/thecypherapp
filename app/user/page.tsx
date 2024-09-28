"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/components/sidebar";
import { useRecoilState } from "recoil";
import { userDetailsAtom } from "@/states/atoms/userAtoms";
import Loading from "./loading";
import Main from "@/components/Main";



export default function UserHome() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom)

  const user = {
    name: session?.user?.name ?? "JohnDoe",
    image: session?.user?.image ?? "/some-rondom.png",
    email: session?.user?.email ??  "john@email.com"
  }

  const router = useRouter();
  
  useEffect(()=>{
    setUserDetails(user)
  },[session])

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
      <div className="mx-24 flex">
        <Sidebar />
        <Main />
      </div>
    );
  }

  return null; 
}

