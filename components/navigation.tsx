import { cn } from "@/lib/utils"

interface NavigationItem {
  name: string;
  href: string;
}
const navigationItems : NavigationItem[] = [
  { name: "Timeline", href: "#" },
  { name: "Notifications", href: "#" },
  { name: "Explore", href: "#" },
]

export function Navigation() {
  return (
    <nav className="flex flex-col gap-2 p-4">
      {navigationItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
            "hover:bg-accent hover:text-[#8661C1]",
            "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
          )}
        >
          {item.name}
        </a>
      ))}
      <a
          key="Training Session"
          href="#"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
            "hover:bg-accent hover:text-[#8661C1]",
            "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
          )}
        >
          Training Session
        </a>
    </nav>
  )
}