"use client";

import {  ChevronsUpDown, Languages, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetUserDetails } from "@/api/auth/use-get-user-details";
import { deleteCookie } from "@/api/auth/cookie";
import { useTransition } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQueryClient } from "@tanstack/react-query";

export function NavUser() {
  const { data: userData, isLoading, isError } = useGetUserDetails();

  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    startTransition(async () => {
      await deleteCookie();
      queryClient.clear(); // Clear all React Query cache
      window.location.href = '/login'; // This will trigger a full page reload
    });
  };

  const { language, setLanguage } = useLanguage();

  const { isMobile } = useSidebar();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  if (!userData) {
    return <div>User data not found</div>;
  }
  const avatar =
    userData?.fullName.slice(0, 2).toUpperCase()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={avatar} alt={userData?.fullName} /> */}
                <AvatarFallback className="rounded-lg">{avatar}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {userData?.fullName}
                </span>
                <span className="truncate text-xs">{userData?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={userData?.fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {userData?.fullName}
                  </span>
                  <span className="truncate text-xs">{userData?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setLanguage(language === "en" ? "kn" : "en")} className="hover:cursor-pointer"> 
              <Languages className="h-4 w-4" />
              {language === "en" ? "ಕನ್ನಡ" : "English"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={isPending} onClick={handleLogout} className="hover:cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
