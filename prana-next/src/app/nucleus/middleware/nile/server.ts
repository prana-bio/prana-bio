import Nile from '@niledatabase/server';
import AuthCookieData from '@/app/nucleus/middleware/nile/auth-utils';

/**
 * Initializes the Nile server object for reuse across all pages.
 *
 * The Nile server configuration.
 * Note that the Nile server configuration points to Nile APIs as the base path.
 *
 * @constant {Server} nile - The configured Nile server instance.
 */

const nile = await Nile({
    user: String(process.env.NILEDB_USER),
    password: String(process.env.NILEDB_PASSWORD),
    debug: true,
});

export default nile;

/**
 * Configures and returns a reference to the Nile Server, using the user's authentication token and optional tenant ID.
 *
 * If Nile already has a connection to the same tenant database for the same user,
 * the function returns the existing connection.
 *
 * @param {any} rawAuthCookie - The raw authentication cookie containing user information.
 * @param {string | null | undefined} tenantId - The optional tenant ID for database configuration.
 * @returns {*} - A reference to the configured Nile Server instance.
 */
export function configureNile(
    rawAuthCookie: any,
    tenantId: string | null | undefined,
) {
    const authData = JSON.parse(
        rawAuthCookie.value,
    ) as AuthCookieData;
    return nile.getInstance({
        tenantId: tenantId,
        userId: authData.tokenData?.sub,
        api: {
            token: authData.accessToken,
        },
    });
}
