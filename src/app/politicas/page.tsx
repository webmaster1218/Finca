"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, FileText, Trees } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function PoliticasPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[#fffbf0] text-[#6f7c4e] font-serif">
            {/* Header / Nav Area */}
            <nav className="p-6 border-b border-[#9a7d45]/10 bg-[#fffbf0]/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="uppercase tracking-widest text-xs">{t('policies.back_home')}</span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <Trees className="w-5 h-5 text-[#9a7d45]" />
                        <span className="text-lg italic tracking-tighter">La Juana</span>
                    </div>
                </div>
            </nav>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl mb-6">{t('policies.hero_title')}</h1>
                    <div className="w-20 h-[1px] bg-[#9a7d45] mx-auto" />
                </motion.div>

                <div className="grid gap-16 md:grid-cols-2">
                    {/* Privacy Policy */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-[#9a7d45]">
                            <Shield className="w-8 h-8" />
                            <h2 className="text-2xl italic">{t('policies.privacy_title')}</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg italic">
                            {t('policies.privacy_content')}
                        </p>
                    </motion.section>

                    {/* Terms and Conditions */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-[#9a7d45]">
                            <FileText className="w-8 h-8" />
                            <h2 className="text-2xl italic">{t('policies.terms_title')}</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg italic">
                            {t('policies.terms_content')}
                        </p>
                    </motion.section>
                </div>

                <div className="mt-24 pt-12 border-t border-[#9a7d45]/10 text-center text-slate-400 text-sm">
                    <p>© 2026 La Juana cerro tusa. {t('footer.rights')}</p>
                </div>
            </div>
        </main>
    );
}

