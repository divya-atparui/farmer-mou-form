"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => setLanguage(language === "en" ? "kn" : "en")}
    >
      <Languages className="h-4 w-4" />
      {language === "en" ? "ಕನ್ನಡ" : "English"}
    </Button>
  );
}
