import { JwtPayload } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { configureNile } from '@/app/nucleus/middleware/nile/server';

/**
 * Generates cookie options for setting an authentication cookie.
 *
 * @param {number} maxAge - The maximum age of the cookie in seconds.
 * @returns {CookieOptions} - The cookie options object.
 */
export function cookieOptions(
    maxAge: number,
): CookieOptions {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
        maxAge: maxAge,
        path: '/',
    };
}

/**
 * Converts form data and decoded JWT data into an authentication cookie data object.
 *
 * @param {FormData} formData - The form data containing authentication information.
 * @param {DecodedJWTData} decodedJWT - The decoded JWT data.
 * @returns {AuthCookieData} - The authentication cookie data object.
 */

export function toCookieData(
    formData: FormData,
    decodedJWT: DecodedJWTData,
): AuthCookieData {
    return {
        accessToken: String(formData.get('access_token')),
        state: String(formData.get('state')),
        event: String(formData.get('event')),
        error: String(formData.get('error')),
        tokenData: decodedJWT,
    };
}

/**
 * Sets authentication cookies for the user.
 *
 * @param {string} accessToken - User's access token.
 * @param {string} [userId=''] - User ID.
 * @param {string} tenantId - Tenant ID.
 * @param {string[]} roles - User roles.
 */
export function setAuthCookies(
    accessToken: string,
    userId: string = '',
    tenantId: string,
    roles: string[],
) {
    const cookieData = {
        accessToken,
        tokenData: { userId, tenantId, roles },
    };
    cookies().set(
        'authData',
        JSON.stringify(cookieData),
        cookieOptions(3600),
    );
}

/**
 * Parses the authentication cookie to retrieve the tenant ID.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie.
 * @returns {string | undefined} - The tenant ID or undefined if parsing fails.
 */
export function getTenantId(
    rawAuthCookie: any,
): string | null | undefined {
    try {
        const authData = JSON.parse(
            rawAuthCookie.value,
        ) as AuthCookieData;
        return authData.tokenData.tenantId;
    } catch (e) {
        return undefined;
    }
}

/**
 * Parses the authentication cookie to retrieve the user ID.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie.
 * @returns {string | undefined} - The user ID or undefined if parsing fails.
 */
export function getUserId(
    rawAuthCookie: any,
): string | null | undefined {
    try {
        const authData = JSON.parse(
            rawAuthCookie.value,
        ) as AuthCookieData;
        return authData.tokenData.userId;
    } catch (e) {
        return undefined;
    }
}

/**
 * Parses the authentication cookie to retrieve the user access token.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie.
 * @returns {string | undefined} - The user access token or undefined if parsing fails.
 */
export function getUserToken(
    rawAuthCookie: any,
): string | undefined {
    try {
        const authData = JSON.parse(
            rawAuthCookie.value,
        ) as AuthCookieData;
        return authData.accessToken;
    } catch (e) {
        return undefined;
    }
}

/**
 * Parses the authentication cookie to retrieve the best available user name.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie.
 * @returns {string | null | undefined} - The best available user name or null if not found, undefined if parsing fails.
 */
export function getUserName(
    rawAuthCookie: any,
): string | null | undefined {
    try {
        const authData = JSON.parse(
            rawAuthCookie.value,
        ) as AuthCookieData;
        const bestName =
            authData.tokenData?.name ||
            authData.tokenData?.email ||
            authData.tokenData?.given_name ||
            authData.tokenData?.family_name;
        return bestName;
    } catch (e) {
        return undefined;
    }
}

/**
 * Parses the authentication cookie to retrieve user roles.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie.
 * @returns {string[] | undefined} - An array of user roles or undefined if parsing fails.
 *
 * @throws {Error} If there is an error parsing the authentication cookie.
 */
export function getUserRoles(
    rawAuthCookie: any,
): string[] | undefined {
    try {
        const authData = JSON.parse(
            rawAuthCookie.value,
        ) as AuthCookieData;
        // Ensure that the tokenData property is present in your cookie structure
        const { roles } = authData.tokenData;
        // Validate that the roles property is an array of strings
        if (
            Array.isArray(roles) &&
            roles.every((role) => typeof role === 'string')
        ) {
            return roles as string[];
        } else {
            console.error(
                'Invalid roles property in authentication cookie.',
            );
            return undefined;
        }
    } catch (error) {
        console.error(
            'Error parsing authentication cookie:',
            error,
        );
        return undefined;
    }
}

/**
 * Retrieves authentication data and configures Nile with it.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {Object} Object containing Nile configuration and authentication data.
 */
export const getAuthDataAndConfigureNile = (
    req: NextRequest,
) => {
    const cookieStore = cookies();
    const authData = cookieStore.get('authData') as
        | AuthCookieData
        | undefined;
    const tenantId = getTenantId(authData);
    const userId = getUserId(authData);
    const nile = configureNile(authData, tenantId);
    return { nile, userId, tenantId };
};

/**
 * Retrieves authentication data and configures Nile with it.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {Object} Object containing Nile configuration and authentication data.
 */
export const getAuthDataAndConfigureNileWithoutTenant = (
    req: NextRequest,
) => {
    const cookieStore = cookies();
    const authData = cookieStore.get('authData') as
        | AuthCookieData
        | undefined;
    const userId = getUserId(authData);
    const nile = configureNile(authData, undefined);
    return { nile, userId };
};

export interface DecodedJWTData extends JwtPayload {
    name: string | null;
    given_name: string | null;
    family_name: string | null;
    email: string | null;
    picture: string | null;
    userId: string | null;
    tenantId: string | null;
    roles: string[] | null;
}

export default interface AuthCookieData {
    accessToken: string;
    tokenData: DecodedJWTData;
    state: string | null;
    event: string | null;
    error: string | null;
}

export interface CookieOptions {
    httpOnly: boolean;
    secure: boolean; // Use HTTPS in production
    maxAge: number;
    path: string;
}
