import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    console.log(`[API Calendar] Fetching calendar data. Params: start=${start}, end=${end}`);

    const propertyId = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';
    const apiToken = process.env.HOSPITABLE_API_TOKEN;

    if (!apiToken) {
        console.error('[API Calendar] HOSPITABLE_API_TOKEN is not configured.');
        return NextResponse.json({ error: 'HOSPITABLE_API_TOKEN is not configured' }, { status: 500 });
    }

    const url = new URL(`https://public.api.hospitable.com/v2/properties/${propertyId}/calendar`);
    if (start) {
        url.searchParams.append('start', start);
        url.searchParams.append('start_date', start);
    }
    if (end) {
        url.searchParams.append('end', end);
        url.searchParams.append('end_date', end);
    }

    try {
        console.log(`[API Calendar] Requesting: ${url.toString()}`);
        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Calendar] Hospitable Error (${response.status}): ${errorText}`);
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const data = await response.json();

        // Log brief summary for debugging
        const days = data.data?.days || data.days || (Array.isArray(data) ? data[0]?.data?.days : []);
        if (Array.isArray(days) && days.length > 0) {
            console.log(`[API Calendar] Success. Received ${days.length} days. First: ${days[0].date}, Last: ${days[days.length - 1].date}`);
        } else {
            console.warn(`[API Calendar] Success, but no days found in response.`);
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Calendar] Fetch failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const propertyId = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';
    const apiToken = process.env.HOSPITABLE_API_TOKEN;

    if (!apiToken) {
        return NextResponse.json({ error: 'HOSPITABLE_API_TOKEN is not configured' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const url = `https://public.api.hospitable.com/v2/properties/${propertyId}/calendar`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
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
        console.error('[API Calendar] PUT failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
