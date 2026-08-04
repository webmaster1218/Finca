"use client";

import React, { createContext, useContext } from "react";
import type { Locale } from "../lib/i18n/locales";
import { localizeHref } from "../lib/i18n/locales";
import type { Dictionary } from "../lib/i18n/getDictionary";

type Language = "es" | "en";

interface LanguageContextType {
    language: Language;
    t: (key: string) => string;
    useHref: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
    language,
    dictionary,
    children,
}: {
    language: Language;
    dictionary: Dictionary;
    children: React.ReactNode;
}) {
    const t = (key: string) => dictionary[key] || key;
    const useHref = (path: string) => localizeHref(language, path);

    return (
        <LanguageContext.Provider value={{ language, t, useHref }}>
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
