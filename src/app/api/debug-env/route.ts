import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const allKeys = Object.keys(process.env);

    const findings = {
        HOSPITABLE_API_TOKEN: {
            exists: !!process.env.HOSPITABLE_API_TOKEN,
            length: process.env.HOSPITABLE_API_TOKEN?.length || 0
        },
        ADMIN_USERNAME: {
            exists: !!process.env.ADMIN_USERNAME,
            length: process.env.ADMIN_USERNAME?.length || 0
        },
        HOSPITABLE_TOKEN_1: {
            exists: !!process.env.HOSPITABLE_TOKEN_1,
            length: process.env.HOSPITABLE_TOKEN_1?.length || 0
        },
        HOSPITABLE_TOKEN_2: {
            exists: !!process.env.HOSPITABLE_TOKEN_2,
            length: process.env.HOSPITABLE_TOKEN_2?.length || 0
        },
        HOSPITABLE_TOKEN_3: {
            exists: !!process.env.HOSPITABLE_TOKEN_3,
            length: process.env.HOSPITABLE_TOKEN_3?.length || 0
        },
        HOSPITABLE_TOKEN_4: {
            exists: !!process.env.HOSPITABLE_TOKEN_4,
            length: process.env.HOSPITABLE_TOKEN_4?.length || 0
        },
        HOSPITABLE_TOKEN_5: {
            exists: !!process.env.HOSPITABLE_TOKEN_5,
            length: process.env.HOSPITABLE_TOKEN_5?.length || 0
        }
    };

    const totalLength = [
        process.env.HOSPITABLE_TOKEN_1,
        process.env.HOSPITABLE_TOKEN_2,
        process.env.HOSPITABLE_TOKEN_3,
        process.env.HOSPITABLE_TOKEN_4,
        process.env.HOSPITABLE_TOKEN_5
    ].filter(Boolean).map(p => p!.trim()).join('').length;

    return NextResponse.json({
        message: "Diagnostic tool for Hospitable environment variables",
        findings,
        allEnvKeys: allKeys.sort(), // List all keys to see what Hostinger is actually passing
        reconstructedTotalLength: totalLength,
        instructions: "If HOSPITABLE_API_TOKEN is false, ensure you set HOSPITABLE_TOKEN_1 through HOSPITABLE_TOKEN_5 in Hostinger. Total length should be approx 1100-1200 characters.",
        serverTime: new Date().toISOString(),
        nodeVersion: process.version,
    });
}
