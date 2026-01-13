import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'admin_session';

export async function login(username: string, password: string) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        return response;
    }
    return NextResponse.json({ success: false, error: 'Password incorrecto' }, { status: 401 });
}

export function logout() {
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
    return response;
}

export function isAuthenticated(request: NextRequest) {
    const session = request.cookies.get(SESSION_COOKIE);
    return session?.value === 'true';
}
