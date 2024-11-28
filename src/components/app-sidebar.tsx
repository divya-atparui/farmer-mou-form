import {  Home, Inbox,  } from "lucide-react"


import {
  Sidebar,
  SidebarContent,

  SidebarGroup,

  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Applogout from "./app-logout";

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
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
      
        <SidebarGroup>
          <SidebarGroupLabel>Farmer&apos;s MOU Section</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="rounded-xl border bg-card  shadow mb-4 mx-2">
      <Applogout />
      </div>
     
    </Sidebar>
  )
}