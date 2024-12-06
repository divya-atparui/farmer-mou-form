"use client";

import { deleteCookie } from "@/api/auth/cookie";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { LogOut } from "lucide-react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await deleteCookie();
      queryClient.clear(); // Clear all React Query cache
      window.location.href = '/login';
    });
  };

  return (
    <>
      <SidebarProvider className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <SidebarTrigger className="bg-blue-100 p-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="bg-green-100 p-4 rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              title="Logout"
            >
              <LogOut className={`w-6 h-6 ${isPending ? 'text-gray-400' : 'text-blue-500'} hover:text-red-500 transition-colors`} />
            </button>
          </div>
          {children}
        </main>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
