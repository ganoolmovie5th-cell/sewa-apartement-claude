"use client";

import { useState, useEffect } from "react";
import type { Language } from "@/types";

const STORAGE_KEY = "sewa-lang";

let _lang: Language = "id";
let _listeners: Array<() => void> = [];

function subscribe(fn: () => void) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter((l) => l !== fn); };
}

function setLangGlobal(l: Language) {
  _lang = l;
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  _listeners.forEach((fn) => fn());
}

export function useLanguage() {
  const [lang, setLocalLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(STORAGE_KEY) as Language) || "id";
    }
    return "id";
  });

  useEffect(() => subscribe(() => setLocalLang(_lang)), []);

  const setLang = (l: Language) => setLangGlobal(l);
  const toggle = () => setLangGlobal(lang === "id" ? "en" : "id");
  const t = (text: { id: string; en: string }) => text[lang];

  return { lang, setLang, toggle, t };
}
