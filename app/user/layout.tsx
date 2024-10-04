"use client"

import Sidebar from "@/components/sidebar";
import { userDetailsAtom } from "@/states/atoms/userAtoms";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { prisma } from "../lib";

export default function Layout({
    
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom)
  
    const user = {
      name: session?.user?.name ?? "JohnDoe",
      image: session?.user?.image ?? "/some-rondom.png",
      email: session?.user?.email ??  "john@email.com"
    }
  console.log(user)
    
    useEffect(()=>{
      setUserDetails(user)
    },[session])
    
    if(session){
        return (
            <div className="flex">
              <Sidebar />
              <div className="w-full">
              {children}
              </div>
            </div>
          );
    }
  }