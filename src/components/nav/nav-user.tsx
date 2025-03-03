"use client";

import { ChevronsUpDown, Languages, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetUserDetails } from "@/api/auth/use-get-user-details";
import { deleteCookie } from "@/api/auth/cookie";
import { useTransition } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function NavUser() {
  const { data: userData, isLoading, isError } = useGetUserDetails();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const { language, setLanguage } = useLanguage();
  const { isMobile } = useSidebar();
  
  // Animation refs
  const userRef = useRef(null);
  const loadingRef = useRef(null);
  const errorRef = useRef(null);

  // Animation for user component
  useEffect(() => {
    if (userData && userRef.current) {
      gsap.fromTo(userRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else if (isLoading && loadingRef.current) {
      gsap.fromTo(loadingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else if (isError && errorRef.current) {
      gsap.fromTo(errorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [userData, isLoading, isError]);

  const handleClearCookiesAndLogout = async () => {
    startTransition(async () => {
      // Add logout animation
      if (userRef.current) {
        await gsap.to(userRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in"
        });
      }
      
      await deleteCookie();
      queryClient.clear(); // Clear all React Query cache
      window.location.href = '/login'; // This will trigger a full page reload
    });
  };

  // Hover animation for dropdown trigger
  const handleHover = (element: HTMLElement, isEntering: boolean) => {
    gsap.to(element, {
      scale: isEntering ? 1.02 : 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  if (isLoading) {
    return (
      <div 
        ref={loadingRef}
        className="flex items-center gap-3 px-2"
      >
        <div className="animate-pulse flex items-center gap-2 w-full">
          <div className="h-9 w-9 bg-green-600/20 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-green-600/20 rounded w-24 mb-2"></div>
            <div className="h-3 bg-green-600/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  // If no user data is found, immediately clear cookies and let middleware handle redirect
  if (!userData) {
    handleClearCookiesAndLogout();
    return null; // Return null while the logout process is happening
  }

  if (isError) {
    return (
      <div 
        ref={errorRef}
        className="flex items-center gap-3 px-2"
      >
        <Avatar className="h-9 w-9 rounded-xl bg-destructive/10">
          <AvatarFallback className="rounded-xl text-destructive">GU</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-lg tracking-tight">Guest User</span>
          <span className="text-xs text-destructive">Error loading profile</span>
        </div>
      </div>
    );
  }

  const avatar = userData?.fullName.slice(0, 2).toUpperCase();
  
  return (
    <div ref={userRef} className="flex items-center justify-between w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="flex items-center gap-3 px-2 w-full outline-none"
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
          >
            <Avatar className="h-9 w-9 rounded-xl border-2 border-green-600/10">
              <AvatarFallback className="rounded-xl bg-green-600/10 text-green-600">{avatar}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm tracking-tight truncate max-w-[120px]">
                {userData?.fullName}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">{userData?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
          </button>
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
                <AvatarFallback className="rounded-lg bg-green-600/10 text-green-600">{avatar}</AvatarFallback>
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
            <DropdownMenuItem 
              onClick={() => setLanguage(language === "en" ? "kn" : "en")} 
              className="hover:cursor-pointer"
            > 
              <Languages className="mr-2 h-4 w-4" />
              {language === "en" ? "ಕನ್ನಡ" : "English"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            disabled={isPending} 
            onClick={handleClearCookiesAndLogout} 
            className="hover:cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
