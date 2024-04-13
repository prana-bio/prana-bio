'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/nucleus/utils';
import { buttonVariants } from '@/app/components/molecules/button';
import { SignUpForm } from '@/app/components/organisms/auth/sign-up-form';
import { ThemeToggle } from '../components/molecules/theme-toggle';
import { useUserSession } from '@/app/nucleus/context/user-provider';

export default function AuthenticationPage() {
    const { push } = useRouter();
    const { updateUserSession } = useUserSession();

    const handleSuccess = async () => {
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
                const userSessionData =
                    await response.json();
                await updateUserSession(userSessionData);
                localStorage.setItem(
                    'selectedTenantId',
                    userSessionData.selectedTenant.id,
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
                    src="/dakota.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden h-screen object-cover"
                />
                <Image
                    src="/dakota.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block h-screen object-cover"
                />
            </div>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({
                            variant: 'ghost',
                        }),
                        'absolute right-4 top-4 md:right-8 md:top-8',
                    )}
                >
                    Login
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
                    <div className="absolute inset-0" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <span className="text-2xl pr-2">
                            🦣
                        </span>{' '}
                        Prana
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Brace yourself: Over
                                1 million species are
                                teetering on the brink of
                                extinction. Identify,
                                protect, and be a hero for a
                                thriving planet. Ready to
                                make a difference? Prana
                                awaits your eco-adventure.
                                You can amplify your impact
                                by taking action or
                                contributing to protection
                                efforts.&rdquo;
                            </p>
                            <footer className="text-sm">
                                -Connor Barrett
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                        <SignUpForm
                            onSuccess={(response) =>
                                handleSuccess
                            }
                            onError={(error) =>
                                push('/sign-up')
                            }
                        />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree
                            to our{' '}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
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
