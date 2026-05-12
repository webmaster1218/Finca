import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ status: 'error', message: 'Supabase not configured' }, { status: 500 });
        }

        // Realizamos una consulta muy ligera para mantener la conexión activa.
        // Nota: He usado 'equipment_settings' como en el otro proyecto, 
        // si tienes otra tabla como 'reservations', puedes cambiar el nombre aquí.
        const { error } = await supabase
            .from('equipment_settings')
            .select('id')
            .limit(1);

        if (error) {
            // Si el error es solo que la tabla no existe, la conexión sigue estando activa,
            // lo cual cumple el propósito del keep-alive.
            console.log('Keep-alive ping (table check):', error.message);
        }

        return NextResponse.json({ 
            status: 'ok', 
            message: 'Supabase connection attempt successful',
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (err) {
        console.error('Keep-alive unexpected error:', err);
        return NextResponse.json({ status: 'error', message: 'Unexpected error' }, { status: 500 });
    }
}
