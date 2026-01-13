/**
 * Utility to get the Hospitable API token.
 * Hostinger has a character limit for environment variables (~512-1024 chars).
 * Since the Hospitable JWT is ~1100 chars, we split it into multiple variables.
 */
export function getHospitableToken(): string {
    // 1. Try full token first (for local/vercel)
    const fullToken = process.env.HOSPITABLE_API_TOKEN;
    if (fullToken && fullToken.length > 100) {
        return fullToken;
    }

    // 2. Otherwise, reconstruct from parts (for Hostinger)
    const part1 = process.env.HOSPITABLE_TOKEN_1 || '';
    const part2 = process.env.HOSPITABLE_TOKEN_2 || '';
    const part3 = process.env.HOSPITABLE_TOKEN_3 || '';
    const part4 = process.env.HOSPITABLE_TOKEN_4 || '';
    const part5 = process.env.HOSPITABLE_TOKEN_5 || '';

    const reconstructed = `${part1}${part2}${part3}${part4}${part5}`.trim();

    if (!reconstructed) {
        console.error('[Auth Utility] No Hospitable API Token found in environment variables.');
    }

    return reconstructed;
}
