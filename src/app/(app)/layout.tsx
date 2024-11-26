"use client"
import { deleteCookie } from "@/api/auth/cookie";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await deleteCookie();
      router.push("/login");
    });
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          size="sm"
          disabled={isPending}
        >
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
}
