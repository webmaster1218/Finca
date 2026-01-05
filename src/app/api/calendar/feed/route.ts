import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import ical from 'ical-generator';

export async function GET() {
    try {
        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*');

        // Si hay un error de base de datos (ej. tabla no creada), 
        // devolvemos un calendario vacío en lugar de un error 500 
        // para que Airbnb acepte la URL inicialmente.
        const calendar = ical({
            name: 'La Juana - Venecia Reservations',
            prodId: { company: 'La Juana', product: 'Booking System', language: 'ES' }
        });

        if (!error && bookings) {
            bookings.forEach(booking => {
                calendar.createEvent({
                    start: new Date(booking.check_in),
                    end: new Date(booking.check_out),
                    summary: 'Reserva Web',
                    description: `Huéspedes: ${booking.guest_count}`,
                });
            });
        }

        return new NextResponse(calendar.toString(), {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="reservas.ics"',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error: any) {
        // En caso de error fatal, devolvemos un iCal básico para no romper la conexión
        return new NextResponse('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR', {
            status: 200,
            headers: { 'Content-Type': 'text/calendar' }
        });
    }
}
