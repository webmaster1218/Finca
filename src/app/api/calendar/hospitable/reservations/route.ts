import { NextResponse } from 'next/server';
import { getHospitableToken } from '@/lib/hospitable';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const propertyUuid = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';
    const apiToken = getHospitableToken();

    if (!apiToken) {
        console.error('[API Reservations] HOSPITABLE_API_TOKEN is not configured.');
        return NextResponse.json({
            error: 'HOSPITABLE_API_TOKEN is not configured',
            details: 'Ensure HOSPITABLE_TOKEN_1 through TOKEN_5 are set in Hostinger environment variables.'
        }, { status: 500 });
    }

    if (!start_date || !end_date) {
        return NextResponse.json({ error: 'start_date and end_date are required' }, { status: 400 });
    }

    const url = new URL('https://public.api.hospitable.com/v2/reservations');
    url.searchParams.append('start_date', start_date);
    url.searchParams.append('end_date', end_date);
    url.searchParams.append('properties[]', propertyUuid);
    url.searchParams.append('include', 'financials,guest,properties,listings');
    // We removed date_query=checkin to ensure we catch all overlapping reservations

    try {
        console.log(`[API Reservations] Requesting range: ${start_date} to ${end_date}`);
        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Reservations] Hospitable Error (${response.status}): ${errorText}`);
            return NextResponse.json({
                error: 'Hospitable API Error',
                status: response.status,
                details: errorText
            }, { status: response.status });
        }

        const data = await response.json();

        // Log count for debugging
        const count = Array.isArray(data.data) ? data.data.length : (Array.isArray(data) ? data.length : 0);
        console.log(`[API Reservations] Success. Received ${count} reservations.`);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Reservations] Fetch failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const apiToken = getHospitableToken();
    const propertyUuid = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';

    if (!apiToken) {
        return NextResponse.json({ error: 'HOSPITABLE_API_TOKEN is not configured' }, { status: 500 });
    }

    try {
        const body = await request.json();
        body.property_id = propertyUuid;

        const response = await fetch('https://public.api.hospitable.com/v2/reservations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Reservations] POST failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
