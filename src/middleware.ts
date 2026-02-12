import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Protect Admin Pages
    if (pathname.startsWith('/admin')) {
        // Skip protection for login page and its assets
        if (pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/login/')) {
            return NextResponse.next();
        }

        if (!isAuthenticated(request)) {
            const loginUrl = new URL('/admin', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 2. Protect Protected API Endpoints
    if (pathname.startsWith('/api/calendar/hospitable')) {
        // Allow public access to:
        // - GET /api/calendar/hospitable (availability)
        // - POST /api/calendar/hospitable/reservations (creating bookings)
        const normalizedPath = pathname.replace(/\/$/, '');
        const isPublicCalendar = normalizedPath === '/api/calendar/hospitable' && request.method === 'GET';
        const isPublicReservation = normalizedPath === '/api/calendar/hospitable/reservations' && request.method === 'POST';

        if (!isPublicCalendar && !isPublicReservation && !isAuthenticated(request)) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/calendar/hospitable/:path*'
    ],
};
