import { NextResponse } from 'next/server';
import { getHospitableToken } from '@/lib/hospitable';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ uuid: string }> }
) {
    const { uuid } = await params;
    const apiToken = getHospitableToken();

    if (!apiToken) {
        return NextResponse.json({
            error: 'HOSPITABLE_API_TOKEN is not configured'
        }, { status: 500 });
    }

    if (!uuid) {
        return NextResponse.json({ error: 'Reservation UUID is required' }, { status: 400 });
    }

    const url = `https://public.api.hospitable.com/v2/reservations/${uuid}/cancel`;

    try {
        console.log(`[API Cancel Reservation] Attempting to cancel reservation: ${uuid}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                initiated_by: 'host'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Cancel Reservation] Hospitable Error (${response.status}): ${errorText}`);
            try {
                return NextResponse.json(JSON.parse(errorText), { status: response.status });
            } catch {
                return NextResponse.json({ error: errorText }, { status: response.status });
            }
        }

        const data = await response.json();
        console.log(`[API Cancel Reservation] Successfully canceled reservation: ${uuid}`);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Cancel Reservation] Request failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
