import { useEffect, useState } from "react";
import { translations, type Language } from "../data/translations";

const defaultLanguage: Language = "en";

export default function LanguageToggle() {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("tm30flow-language") as Language | null;
    const nextLanguage = savedLanguage && savedLanguage in translations ? savedLanguage : defaultLanguage;
    applyLanguage(nextLanguage);
    setLanguage(nextLanguage);
  }, []);

  const applyLanguage = (nextLanguage: Language) => {
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("tm30flow-language", nextLanguage);

    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n as keyof (typeof translations)["en"];
      const value = translations[nextLanguage][key];
      if (value) node.textContent = value;
    });
  };

  const handleToggle = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  };

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur" aria-label="Language switcher">
      <button
        type="button"
        onClick={() => handleToggle("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition sm:px-4 sm:text-sm ${
          language === "en" ? "bg-white text-slate-950" : "text-mist hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleToggle("th")}
        className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition sm:px-4 sm:text-sm ${
          language === "th" ? "bg-white text-slate-950" : "text-mist hover:text-white"
        }`}
      >
        ไทย
      </button>
    </div>
  );
}
