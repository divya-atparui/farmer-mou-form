"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { ChevronUp, User2 } from 'lucide-react'
import { LanguageToggle } from "@/components/LanguageToggle";
import { Separator } from './ui/separator'

const Applogout = () => {
  const [isOpen, setIsOpen] = useState(false)

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
              <span className="flex items-center gap-2">
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