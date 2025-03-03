"use client";
import { Home, Inbox} from "lucide-react";
import {
  Sidebar,
  SidebarContent,

  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Navigation items - you can expand this as needed
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Land Details Form",
    url: "/land-details-form",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  
  // Refs for animations
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const footerRef = useRef(null);

  // Animation setup
  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate sidebar entrance
    tl.fromTo(sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 }
    );

    // Animate header
    tl.fromTo(headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      "-=0.3"
    );

    // Animate menu items with stagger
    tl.fromTo(menuItemsRef.current,
      { x: -20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.4,
        stagger: 0.1
      },
      "-=0.2"
    );

    // Animate footer if it exists
    if (footerRef.current) {
      tl.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2"
      );
    }
  }, []);

  // Hover animation for menu items
  const handleMenuItemHover = (element: HTMLElement, isEntering: boolean) => {
    gsap.to(element, {
      scale: isEntering ? 1.02 : 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // Mock user data - replace with actual user data from your auth system
 

  return (
    <Sidebar 
      ref={sidebarRef}
      className="border-r border-border/40 pb-4 pt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background"
      collapsible="icon"
    >
      <SidebarHeader ref={headerRef} className="p-5 border-b border-sidebar-border">
   <NavUser />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-8 mt-5">
            {items.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  if (el) menuItemsRef.current[index] = el;
                }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "gap-4 py-4 px-4 relative group",
                      pathname === item.url && "bg-green-500"
                    )}
                    onMouseEnter={(e) => handleMenuItemHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleMenuItemHover(e.currentTarget, false)}
                  >
                    <Link href={item.url}>
                      <div className="relative flex items-center gap-8">
                        <div className="flex items-center justify-center w-6 h-6">
                          <item.icon className="h-10 w-10" />
                        </div>
                        <span className="text-base">{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
}
