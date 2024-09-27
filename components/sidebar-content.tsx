import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { ProfileSection } from "./profile-section"

export function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Logo />
      </div>
      <ScrollArea className="flex-grow">
        <Navigation />
      </ScrollArea>
      <div className="mt-auto p-4">
        <ProfileSection />
      </div>
    </div>
  )
}