"use client"
import React, { useState, useTransition } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu"
  import { deleteCookie } from "@/api/auth/cookie";

import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { ChevronUp, User2 } from 'lucide-react'
import { LanguageToggle } from "@/components/LanguageToggle";
import { Separator } from './ui/separator'
import { useRouter } from "next/navigation";
const Applogout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await deleteCookie();
      router.push("/login");
    });
  };


  return (
    <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="focus:outline-none">
              <User2 className="mr-2" /> Username
              <ChevronUp className={`ml-auto transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <span  onClick={handleLogout} className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200 ease-in-out">
                <span>Sign out</span>
              </span>
            </DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem>
              <span className="flex items-center gap-2">
                <span>Language</span>
                <LanguageToggle />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
  )
}

export default Applogout