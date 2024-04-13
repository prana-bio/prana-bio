'use client';

/* Root of the Application */
import '@/app/styles/globals.css';
import { cn } from '@/app/nucleus/utils';
import { Inter as FontSans } from 'next/font/google';

import { ThemeProvider } from '@/app/nucleus/context/theme-provider';
import { Toaster } from '@/app/components/molecules/toaster';
import { UserSessionProvider } from '@/app/nucleus/context/user-provider';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UserSessionProvider>
                        {children}
                    </UserSessionProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
