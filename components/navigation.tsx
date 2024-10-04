"use client"
import { cn } from "@/lib/utils";
import { mainNavigationAtom } from "@/states/atoms/mainComponentAtom";


import { useRecoilState } from "recoil";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { name: "Timeline", href: "/user/posts/id" },
  { name: "Notifications", href: "/user/notifications" }
];

export function Navigation() {
  const [mainComponent, setMainComponent] = useRecoilState(mainNavigationAtom);

  return (
    <nav className="flex flex-col gap-2 p-4">
      <a
        key="Training Session"
        href="/user/training"
        onClick={() => {
          setMainComponent("Training Session");
        }}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
          "hover:bg-accent hover:text-[#8661C1]",
          "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
        )}
      >
        Training Session
      </a>
      {navigationItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={() => {
            setMainComponent("Training Session");
          }}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
            "hover:bg-accent hover:text-[#8661C1]",
            "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
          )}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
