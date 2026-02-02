import AdminCalendar from '../../../components/AdminCalendar';
import { Info, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';

export default function AdminCalendarioPage() {
    return (
        <div className="h-full flex flex-col space-y-4">
            {/* Ultra Compact Header */}
            {/* Ultra Compact Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#6f7c4e] tracking-tight">
                        Calendario de Reservas
                    </h1>
                </div>

                {/* Status Integrated into Header row */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-white border border-slate-300" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#6f7c4e]" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reservado</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#9a7d45]" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bloqueado</span>
                    </div>
                </div>
            </div>

            {/* Calendar Section - Fills remaining space */}
            <div className="flex-grow min-h-0">
                <AdminCalendar />
            </div>
        </div>
    );
}
