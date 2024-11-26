"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/messages/en.json";
import kn from "@/messages/kn.json";

type Language = "en" | "kn";
type Messages = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<Messages>(en);

  useEffect(() => {
    setMessages(language === "en" ? en : kn);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
