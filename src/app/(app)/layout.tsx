"use client"
import { deleteCookie } from "@/api/auth/cookie";
import { LanguageToggle } from "@/components/LanguageToggle";
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
      <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-2">
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
      </div>
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
}
