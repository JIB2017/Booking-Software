import { jwtVerify } from "jose";

interface JWTPayload {
    jti: string,
    iat: number
}

export function getJwtSecretKey(): string {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret || secret.length === 0) {
        throw new Error("JWT Not Found");
    }

    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token,  new TextEncoder().encode(getJwtSecretKey()));
        return verified.payload as JWTPayload
    } catch (e) {
        throw new Error("Token not valid or expired.");
    }
}