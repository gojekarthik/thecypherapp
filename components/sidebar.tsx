"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SidebarContent } from "./sidebar-content";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex flex-col w-[240px] h-screen bg-background  border-x-">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
