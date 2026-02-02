"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Calendar as CalendarIcon, LogOut, Settings, Menu, ChevronRight, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === '/admin';

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    const navItems = [
        { name: 'Calendario', href: '/admin/calendario', icon: CalendarIcon },
    ];

    if (isLoginPage) {
        return <div className="h-screen bg-[#fffbf0]">{children}</div>;
    }

    return (
        <div className="h-screen bg-[#fffbf0] flex overflow-hidden font-sans">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`bg-[#6f7c4e] text-[#fffbf0] flex flex-col shadow-2xl z-[70] flex-shrink-0 transition-all duration-300 ease-in-out fixed lg:relative h-full ${(isExpanded || isMobileOpen) ? 'w-64' : 'w-24'
                    } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } group`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 overflow-hidden border-b border-white/5 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-transparent rounded-xl flex items-center justify-center">
                        <img
                            src="/identidad de marca/LOGO LA JUANA CERRO TUSA-02.png"
                            alt="La Juana Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className={`ml-3 font-serif font-bold text-xl tracking-wide whitespace-nowrap transition-opacity duration-300 ${(isExpanded || isMobileOpen) ? 'opacity-100' : 'opacity-0'}`}>
                        Admin
                    </span>

                    {/* Close Button Mobile */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-grow flex flex-col py-6 space-y-4 px-4 overflow-hidden">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center rounded-2xl transition-all duration-300 h-12 ${isActive
                                    ? 'bg-[#9a7d45] text-white shadow-lg shadow-[#9a7d45]/20'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-12 md:w-16 flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`ml-2 font-bold text-sm whitespace-nowrap transition-opacity duration-300 ${(isExpanded || isMobileOpen) ? 'opacity-100' : 'opacity-0'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 mb-2 flex flex-col space-y-2 overflow-hidden border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center rounded-2xl h-12 text-white/30 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all group/btn"
                    >
                        <div className={`flex-shrink-0 w-12 md:w-16 flex items-center justify-center group-hover/btn:scale-110 transition-transform`}>
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className={`ml-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-opacity duration-300 ${(isExpanded || isMobileOpen) ? 'opacity-100' : 'opacity-0'}`}>
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col relative min-w-0 h-full overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-30 shadow-sm">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors text-[#6f7c4e]"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="font-serif font-bold text-lg lg:text-xl text-[#6f7c4e] tracking-tight truncate">
                            La Juana
                        </h2>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                        <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                            Panel Admin
                        </p>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <div className="text-right hidden xs:block">
                            <p className="text-[10px] lg:text-xs font-black text-[#6f7c4e] uppercase tracking-tighter">Administrador</p>
                            <p className="text-[9px] text-emerald-500 font-bold uppercase animate-pulse">Online</p>
                        </div>
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl lg:rounded-2xl bg-slate-100 border border-slate-200 p-0.5 flex flex-shrink-0">
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400 rounded-lg lg:rounded-[10px]" />
                        </div>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto lg:overflow-hidden flex flex-col p-2 lg:p-6 bg-[#f1f5f9]/40 relative font-sans">
                    {children}
                </main>
            </div>

            <style jsx global>{`
                body { overflow: hidden !important; }
                .fc { height: 100% !important; --fc-header-toolbar-margin-bottom: 0.5rem !important; }
                .fc-view-harness {
                    background: white !important;
                    border-radius: 1rem lg:1.5rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    border: 1px solid #f1f5f9;
                }
                
                @media (max-width: 1024px) {
                    .fc .fc-toolbar {
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        padding: 0.5rem !important;
                        gap: 0.25rem !important;
                        flex-wrap: nowrap !important;
                    }
                    .fc .fc-toolbar-chunk {
                        display: flex !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        gap: 0.25rem !important;
                    }
                    .fc .fc-toolbar-title {
                        font-size: 0.9rem !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                        max-width: 100px !important;
                    }
                    .fc .fc-button {
                        padding: 0.3rem 0.5rem !important;
                        font-size: 0.7rem !important;
                        border-radius: 8px !important;
                    }
                    .fc .fc-daygrid-day-number {
                        font-size: 0.75rem !important;
                        padding: 2px 4px !important;
                    }
                    .fc .fc-daygrid-event {
                        margin: 1px !important;
                        font-size: 0.65rem !important;
                        padding: 1px 2px !important;
                    }
                }
            `}</style>
        </div>
    );
}
