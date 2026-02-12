"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";

export default function GraciasPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="min-h-[70vh] bg-[#fafaf9] flex items-center justify-center p-4 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12 border border-slate-100 text-center max-w-[500px] w-full"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
                    >
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </motion.div>

                    <h1 className="text-4xl font-bold text-[#222222] mb-6">¡Gracias por elegirnos!</h1>

                    <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                        Tu reserva en <strong>Finca Juana</strong> ha sido recibida con éxito.<br />
                        Te enviaremos un correo electrónico con la confirmación, el contrato y los detalles del pago en breve.
                    </p>

                    <div className="space-y-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#1a3c34] text-white font-bold py-5 rounded-2xl hover:bg-[#254d42] transition-all shadow-lg text-lg uppercase tracking-wide"
                            >
                                Volver al Inicio
                            </motion.button>
                        </Link>

                        <p className="text-sm text-slate-400">
                            Si tienes alguna duda, contáctanos por WhatsApp.
                        </p>
                    </div>
                </motion.div>
            </div>
            <Footer />
            <WhatsAppFloating />
        </main>
    );
}
