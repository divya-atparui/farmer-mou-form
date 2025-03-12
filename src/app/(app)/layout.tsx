"use client";

import { deleteCookie } from "@/api/auth/cookie";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { LogOut, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { language, setLanguage } = useLanguage();

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
            <div className="flex items-center gap-3">
              <SidebarTrigger className="bg-blue-100 p-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex items-center gap-2 ml-4 p-2 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg shadow-sm">
                <Image 
                  src="/aurex.jpeg" 
                  alt="Aurex Logo" 
                  width={30} 
                  height={30} 
              
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-600">Aurex</span>
                  <span className="text-xs text-blue-800 opacity-80">Powered by Aurigraph</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage(language === "en" ? "kn" : "en")}
                className="bg-blue-100 p-4 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                title={language === "en" ? "Switch to ಕನ್ನಡ" : "Switch to English"}
              >
                <Languages className="w-6 h-6 text-blue-500 hover:text-blue-700 transition-colors" />
                <span className="text-sm font-medium text-blue-700">
                  {language === "en" ? "ಕನ್ನಡ" : "English"}
                </span>
              </button>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="bg-green-100 p-4 rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                title="Logout"
              >
                <LogOut className={`w-6 h-6 ${isPending ? 'text-gray-400' : 'text-blue-500'} hover:text-red-500 transition-colors`} />
              </button>
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
