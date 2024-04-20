/**
 * Middleware: CSP and Session Validation for Pages
 *
 * This middleware performs two main functions:
 * - Session Validation: Validates user sessions using the 'authData' cookie, which contains 'user_id' and 'tenant_id'.
 *    It facilitates redirection based on the user's authentication status, directing authenticated users to the dashboard
 *    and unauthenticated users to the login page. It checks the cookie for user details but does not handle JWT token authentication.
 * - Content Security Policy (CSP): Implements a basic CSP to enhance the security of the application. Due to the requirements
 *    of certain libraries for inline styles and scripts (like next-themes, shadcn components, recharts), 'script-src' and 'style-src'
 *    directives are adjusted to prevent CSP violations while still offering security benefits. This is a compromise to maintain
 *    functionality with third-party libraries that require inline scripts or styles.
 *
 * Note: The CSP implementation aims to enhance security without significantly hindering the application's functionality.
 *       It's an evolving aspect of the application and may be further refined for stricter enforcement in the future.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define common routes for redirection
const LOGIN_PAGE = '/';
const DASHBOARD_PAGE = '/dashboard';
const SIGN_UP_PAGE = '/sign-up';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const cookie = request.cookies.get('authData')?.value;

    // Authentication-based redirection logic
    if (
        (url.pathname === LOGIN_PAGE ||
            url.pathname === SIGN_UP_PAGE) &&
        isAuthenticated(cookie)
    ) {
        return NextResponse.redirect(
            new URL(DASHBOARD_PAGE, url.origin),
        );
    }
    if (
        url.pathname !== LOGIN_PAGE &&
        url.pathname !== SIGN_UP_PAGE &&
        !isAuthenticated(cookie)
    ) {
        return NextResponse.redirect(
            new URL(LOGIN_PAGE, url.origin),
        );
    }

    // Generate a unique nonce for each request for CSP
    const nonce = Buffer.from(crypto.randomUUID()).toString(
        'base64',
    );

    // CSP Headers Configuration
    // Note: 'script-src' and 'style-src' directives are not included due to incompatibilities with certain libraries.
    //  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https://api.mapbox.com;
    //  style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://api.mapbox.com;
    const cspHeader = `
    connect-src 'self' https://api.mapbox.com https://events.mapbox.com ws://127.0.0.1:56250/;
    img-src 'self' blob: data: images.unsplash.com https://api.mapbox.com https://avatar.vercel.sh https://jjnvksli2dfyjtqc.public.blob.vercel-storage.com postimg.cc;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim();

    // Apply CSP headers to the request
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue,
    );

    // Create and return the response with CSP headers
    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue,
    );

    return response;
}

// Helper function to validate user authentication from the cookie
function isAuthenticated(
    cookie: string | undefined,
): boolean {
    if (!cookie) return false;

    try {
        const cookieValue = JSON.parse(cookie);
        const tokenData = cookieValue.tokenData;
        return (
            tokenData.userId &&
            typeof tokenData.userId === 'string' &&
            tokenData.tenantId &&
            typeof tokenData.tenantId === 'string'
        );
    } catch (error) {
        console.error(
            'Error parsing authData cookie:',
            error,
        );
        return false;
    }
}

// Configuration for the middleware matcher
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        {
            type: 'header',
            key: 'purpose',
            value: 'prefetch',
        },
    ],
};
