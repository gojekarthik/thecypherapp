"use client";

import Sidebar from "@/components/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router, isMounted]);

  if (!isMounted || status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    );
  }

  // Return loading while redirecting (if session is not authenticated)
  return null;
}
