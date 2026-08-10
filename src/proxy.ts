import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth';
import { localizePath, type Locale } from './lib/i18n/locales';

const LOCALES = ['es', 'en'];

function detectLocale(request: NextRequest): string {
    // 1. Cookie explícita del usuario
    const cookie = request.cookies.get('locale')?.value;
    if (cookie && LOCALES.includes(cookie)) return cookie;

    // 2. Preferencia del navegador (Accept-Language)
    const header = request.headers.get('accept-language') || '';
    const primary = header.split(',')[0]?.split('-')[0]?.trim().toLowerCase();
    if (primary && LOCALES.includes(primary)) return primary;

    // 3. Default español
    return 'es';
}

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Detección de idioma — rutas sin locale → redirigir a /{locale}{ruta localizada}
    //    (raíz, /galeria, /politicas, /gracias, /tours, /gallery, /policies, etc.).
    //    Se excluyen /api y /_next.
    if (
      pathname === '/' ||
      (!pathname.match(/^\/(es|en)(\/|$)/) &&
       !pathname.startsWith('/_next') &&
       !pathname.startsWith('/api') &&
       // admin legacy se maneja en el bloque 2
       !(pathname === '/admin' || pathname.startsWith('/admin/')) &&
       // assets estáticos del servidor
       !pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js|woff2?)$/))
    ) {
        const locale = detectLocale(request);
        const path = pathname === '/' ? '/' : pathname;
        const localizedPath = localizePath(path, locale as Locale);
        const redirectPath = localizedPath === '/' ? `/${locale}` : `/${locale}${localizedPath}`;
        const url = new URL(redirectPath, request.url);
        return NextResponse.redirect(url);
    }

    // 2. /admin legacy (sin locale) → redirigir a /es/admin (admin solo en español)
    if (pathname === '/admin' || pathname === '/admin/') {
        const url = new URL('/es/admin', request.url);
        return NextResponse.redirect(url);
    }
    if (pathname.startsWith('/admin/') && pathname.length > 8) {
        if (!isAuthenticated(request)) {
            const loginUrl = new URL('/es/admin', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 3. Proteger admin bajo cualquier locale
    const localeMatch = pathname.match(/^\/(es|en)\/admin(\/?$|\/)/);
    if (localeMatch) {
        const userLocale = localeMatch[1];

        // Admin solo en español — forzar redirección a /es
        if (userLocale !== 'es') {
            const url = new URL('/es/admin', request.url);
            return NextResponse.redirect(url);
        }

        // Dejar pasar la página de login (que es /es/admin exacto)
        const isLoginPage = pathname === '/es/admin' || pathname === '/es/admin/';
        if (!isLoginPage && !isAuthenticated(request)) {
            const loginUrl = new URL('/es/admin', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 4. Proteger API endpoints protegidos
    if (pathname.startsWith('/api/calendar/hospitable')) {
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
        // Root y páginas públicas sin locale (detección de idioma).
        // Los slugs en inglés (/gallery, /policies, /thank-you) se traducen aquí.
        '/',
        '/galeria', '/politicas', '/gracias', '/tours/:path*',
        '/gallery', '/policies', '/thank-you',
        // Admin con y sin locale
        '/admin/:path*',
        '/es/admin/:path*',
        '/en/admin/:path*',
        // API protegidas
        '/api/calendar/hospitable/:path*'
    ],
};
