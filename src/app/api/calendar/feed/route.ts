import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import ical from 'ical-generator';

export async function GET() {
    try {
        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*');

        if (error) throw error;

        const calendar = ical({ name: 'Finca Fredonia Reservations' });

        bookings?.forEach(booking => {
            calendar.createEvent({
                start: new Date(booking.check_in),
                end: new Date(booking.check_out),
                summary: booking.guest_name || 'Reserva Web',
                description: `Huéspedes: ${booking.guest_count}`,
            });
        });

        return new NextResponse(calendar.toString(), {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
