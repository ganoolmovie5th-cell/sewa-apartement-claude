"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/types";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (text: { id: string; en: string }) => string;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: "id",
      setLang: (lang) => set({ lang }),
      toggle: () => set((state) => ({ lang: state.lang === "id" ? "en" : "id" })),
      t: (text) => text[get().lang],
    }),
    {
      name: "sewa-lang",
    }
  )
);
