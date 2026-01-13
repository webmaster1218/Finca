"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2, ChevronRight } from 'lucide-react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if already authenticated
        if (localStorage.getItem('admin_auth') === 'true') {
            router.push('/admin/calendario');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                localStorage.setItem('admin_auth', 'true');
                router.push('/admin/calendario');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Credenciales incorrectas. Intenta de nuevo.');
            }
        } catch (err) {
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfaf6] flex items-center justify-center p-4 relative font-sans">
            {/* Back to Home Button */}
            <div className="absolute top-8 left-8">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-[#1a3c34]/60 hover:text-[#1a3c34] font-bold text-sm transition-all group"
                >
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                </button>
            </div>

            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#1a3c34] text-white mb-6 shadow-2xl shadow-[#1a3c34]/20 relative">
                        <Lock className="w-10 h-10" />
                        <div className="absolute -inset-2 bg-[#1a3c34]/5 rounded-3xl -z-10 animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-[#1a3c34] mb-2 tracking-tight">Acceso Admin</h1>
                    <p className="text-slate-500 font-medium">Gestiona las reservas de la Finca</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#9a7d45] ml-1">Usuario</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1a3c34] transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#1a3c34] transition-all outline-none text-slate-700 font-medium"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#9a7d45] ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1a3c34] transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#1a3c34] transition-all outline-none text-slate-700 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-bold text-center animate-bounce">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1a3c34] hover:bg-[#2a4d45] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#1a3c34]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar al Panel
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    Finca Fredonia &copy; 2026 &bull; Seguridad Privada
                </p>
            </div>
        </div>
    );
}
