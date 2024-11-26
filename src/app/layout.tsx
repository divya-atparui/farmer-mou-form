import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/ApiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACM",
  description: "ACM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
