import { NextResponse } from 'next/server';

export async function GET() {
    const findings = {
        HOSPITABLE_API_TOKEN: {
            exists: !!process.env.HOSPITABLE_API_TOKEN,
            length: process.env.HOSPITABLE_API_TOKEN?.length || 0
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
    ].filter(Boolean).join('').length;

    return NextResponse.json({
        message: "Diagnostic tool for Hospitable environment variables",
        findings,
        reconstructedTotalLength: totalLength,
        instructions: "If HOSPITABLE_API_TOKEN is false, ensure you set HOSPITABLE_TOKEN_1 through HOSPITABLE_TOKEN_5 in Hostinger. Total length should be approx 1100-1200 characters.",
        serverTime: new Date().toISOString()
    });
}
