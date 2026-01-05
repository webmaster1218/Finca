import { NextResponse } from 'next/server';

export async function GET() {
    const AIRBNB_ICAL_URL = 'https://www.airbnb.com.co/calendar/ical/1552333147507611088.ics?t=861fa776420f4a9e807c0a1209cd1723';

    try {
        const response = await fetch(AIRBNB_ICAL_URL);
        if (!response.ok) throw new Error('Failed to fetch Airbnb iCal');

        const data = await response.text();

        return new NextResponse(data, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
