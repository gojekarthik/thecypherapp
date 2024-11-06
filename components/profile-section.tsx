import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { useRecoilValue } from "recoil"
import { userDetailsAtom } from "@/states/atoms/userAtoms"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export function ProfileSection() {


  const userDetails = useRecoilValue(userDetailsAtom)

  const router = useRouter()
  const signoutHandler = () => {
    signOut({redirect:false});
    router.push('/auth');
    console.log("reaching oruter")
  }



  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={userDetails.image} alt="User's profile picture" />
          <AvatarFallback>{userDetails.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{userDetails.name}</p>
          <p className="text-xs text-muted-foreground">{userDetails.email}</p>
        </div>
      </div>
      <Button  variant="outline" className="w-full justify-start bg-[#8661C1] text-white" onClick={signoutHandler}>
        <LogOut  className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </div>
  )
}