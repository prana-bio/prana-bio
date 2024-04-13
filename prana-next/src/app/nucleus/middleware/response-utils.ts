import { NextResponse } from 'next/server';

/**
 * Sends a success response with provided data.
 *
 * @param {any} data - Data to be sent in the response body.
 * @param {number} [statusCode=200] - HTTP status code (default is 200).
 * @returns {NextResponse} A NextResponse object with the provided data.
 */
export const handleSuccessResponse = (
    data: any,
    statusCode = 200,
) => {
    return new NextResponse(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: statusCode,
    });
};

/**
 * Sends an error response based on the caught error.
 *
 * @param {Error | any} error - Caught error object or unknown error.
 * @param {string} [responseMessage='Internal Server Error'] - Error message (default is 'Internal Server Error').
 * @param {number} [statusCode=500] - HTTP status code (default is 500).
 * @returns {NextResponse} A NextResponse object with the error message.
 */
export const handleErrorResponse = (
    error: Error,
    responseMessage: string = 'Internal Service Error',
    statusCode = 500,
) => {
    console.error(error, responseMessage, statusCode);
    return new NextResponse(
        JSON.stringify({ error: responseMessage }),
        {
            headers: { 'Content-Type': 'application/json' },
            status: statusCode,
        },
    );
};

/**
 * Sends an unauthorized response.
 *
 * @returns {NextResponse} A NextResponse object indicating unauthorized access.
 */
export const handleUnauthorizedResponse = () => {
    console.error('Unauthorized', 403);
    return new NextResponse(
        JSON.stringify({ error: 'Unauthorized.' }),
        {
            headers: { 'Content-Type': 'application/json' },
            status: 403,
        },
    );
};
