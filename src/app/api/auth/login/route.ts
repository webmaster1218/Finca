import { NextRequest } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        return await login(username, password);
    } catch (error) {
        return Response.json({ success: false, error: 'Error processing request' }, { status: 400 });
    }
}
