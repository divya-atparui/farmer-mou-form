"use client";
// import { deleteCookie } from "@/api/auth/cookie";
import { AppSidebar } from "@/components/nav/app-sidebar";
// import { LanguageToggle } from "@/components/LanguageToggle";
// import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();

  // const handleLogout = async () => {
  //   startTransition(async () => {
  //     await deleteCookie();
  //     router.push("/login");
  //   });
  // };

  return (
    <>
      {/* <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-2">
        <Button
          onClick={handleLogout}
          variant="default"
          size="sm"
          disabled={isPending}
          className="flex items-center gap-1"
        >
          {isPending ? "Logging out..." : "Logout"}
        </Button>
        <LanguageToggle />
      </div> */}
      <SidebarProvider className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 p-4">

          <SidebarTrigger className="sticky top-4 bg-white p-6 mb-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
