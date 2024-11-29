"use client"
import React, { useState, useTransition } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu"
  import { deleteCookie } from "@/api/auth/cookie";

import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { ChevronUp, User2 } from 'lucide-react'
import { LanguageToggle } from "@/components/LanguageToggle";
import { Separator } from '../ui/separator'
import { useRouter } from "next/navigation";
import { useGetUserDetails } from '@/api/auth/use-get-user-details';

const Applogout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

const { data } =  useGetUserDetails()



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
              <User2 className="mr-2" /> {data?.fullName}
              <ChevronUp className={`ml-auto transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width] bg-white shadow-md rounded-md p-4"
          >
            <DropdownMenuItem>
              <div className="flex flex-col bg-blue-100/30 p-2 rounded-md w-full">
                <span className="font-semibold text-lg">{data?.fullName}</span>
                <span className="text-sm text-green-600">{data?.email}</span>
              </div>
            </DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem>
              <div  onClick={handleLogout} className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:cursor-pointer w-full p-2 rounded-md">
                <span>Sign out</span>
              </div>
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