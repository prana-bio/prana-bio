'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/app/nucleus/utils';
import { buttonVariants } from '@/app/components/molecules/button';
import { LogInForm } from '@/app/components/organisms/auth/login-form';
import { ThemeToggle } from '@/app/components/molecules/theme-toggle';
import { useUserSession } from '@/app/nucleus/context/user-provider';

export default function DefaultLogin() {
    const { push } = useRouter();
    const { updateUserSession } = useUserSession();

    const handleLoginSuccess = async () => {
        localStorage.setItem('isAuthenticated', 'true');
        await fetchUserSession();
        push('/dashboard');
    };

    const fetchUserSession = async () => {
        try {
            const response = await fetch(
                '/api/user-session',
            );
            if (response.ok) {
                const userData = await response.json();
                await updateUserSession(userData);
                localStorage.setItem(
                    'selectedTenantId',
                    userData.selectedTenant.id,
                );
            }
        } catch (error) {
            console.error(
                'Error fetching user session:',
                error,
            );
        }
    };

    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/orca.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden h-screen object-cover"
                />
                <Image
                    src="/orca.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block h-screen object-cover"
                />
            </div>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/sign-up"
                    className={cn(
                        buttonVariants({
                            variant: 'ghost',
                        }),
                        'absolute right-4 top-4 md:right-8 md:top-8',
                    )}
                >
                    Create Account
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10  dark:border-r lg:flex">
                    <div className="absolute inset-0" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <span className="text-2xl pr-2">
                            🦥
                        </span>{' '}
                        Prana
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Hey there, Earth
                                steward! Logging in
                                isn&apos;t just a digital
                                handshake; it&apos;s
                                immersing yourself in the
                                incredible beauty of our
                                planet. Did you know? Every
                                day, around 150 species
                                vanish. It&apos;s time to
                                act swiftly and protect the
                                breathtaking wonders that
                                make our world so
                                special.&rdquo;
                            </p>
                            <footer className="text-sm">
                                -Connor Barrett
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welcome back {` 🐳`}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Sign in with your email
                                below.
                            </p>
                        </div>
                        <LogInForm
                            onSuccess={handleLoginSuccess}
                            onError={(err) => push('/')}
                        />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree
                            to our{' '}
                            {/* <Link
                                    href="/terms"
                                    className="underline underline-offset-4 hover:text-primary"
                                > */}
                            Terms of Service
                            {/* </Link>{' '} */} and{' '}
                            {/* <Link
                                    href="/privacy"
                                    className="underline underline-offset-4 hover:text-primary"
                                > */}
                            {` Privacy Policy`}
                            {/* </Link> */}.
                        </p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </>
    );
}
