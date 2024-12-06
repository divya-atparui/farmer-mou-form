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

  const handleClearCookiesAndLogout = async () => {
    startTransition(async () => {
      await deleteCookie();
      queryClient.clear(); // Clear all React Query cache
      window.location.href = '/login'; // This will trigger a full page reload
    });
  };

  const { language, setLanguage } = useLanguage();

  const { isMobile } = useSidebar();
  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
          
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="animate-pulse flex items-center gap-2 w-full">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // If no user data is found, immediately clear cookies and let middleware handle redirect
  if (!userData) {
    handleClearCookiesAndLogout();
    return null; // Return null while the logout process is happening
  }

  if (isError) {
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
                  <AvatarFallback className="rounded-lg">GU</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Guest User
                  </span>
                  <span className="truncate text-xs text-red-500">
                    Error loading profile
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem 
                disabled={isPending} 
                onClick={handleClearCookiesAndLogout}
                className="hover:cursor-pointer text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Clear Session & Login Again
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
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
            <DropdownMenuItem disabled={isPending} onClick={handleClearCookiesAndLogout} className="hover:cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
