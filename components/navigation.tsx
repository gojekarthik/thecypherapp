"use client";
import { cn } from "@/lib/utils";
import { mainNavigationAtom } from "@/states/atoms/mainComponentAtom";
import { useRecoilState } from "recoil";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { name: "Host Cypher", href: "/user/events/host" },
];

export function Navigation() {
  const [mainComponent, setMainComponent] = useRecoilState(mainNavigationAtom);

  // Handler to set the main component
  const handleNavigation = (componentName: string) => {
    setMainComponent(componentName);
  };

  return (
    <nav className="flex flex-col gap-2 p-4">
      <Link
        href="/user/training"
        onClick={() => handleNavigation("Training Session")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
          "hover:bg-accent hover:text-[#8661C1]",
          "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
        )}
      >
        Training Session
      </Link>

      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => handleNavigation(item.name)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-lg transition-colors",
            "hover:bg-accent hover:text-[#8661C1]",
            "focus:bg-accent focus:text-[#8661C1] focus:outline-none"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
