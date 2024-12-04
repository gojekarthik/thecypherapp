"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  const signoutHandler = () => {
    signOut({ redirect: false });
    router.push("/auth");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={session.user.image} alt="User's profile picture" />
          <AvatarFallback>{session.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{session.user.name}</p>
          <p className="text-xs text-muted-foreground">{session.user.email}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full justify-start bg-[#8661C1] text-white"
        onClick={signoutHandler}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
