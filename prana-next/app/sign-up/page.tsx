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
            {/* <div className="md:hidden">
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
            </div> */}
            {/* <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"> */}
            <div
                className="container relative flex h-screen flex-col items-center justify-center w-full px-4 
                           sm:w-auto sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 "
            >
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
                <div className="relative hidden h-full flex-col bg-login-pattern bg-size-100 bg-slightly-below-top bg-no-repeat p-10 dark:border-r lg:flex">
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        prana bio
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                The axolotl, a unique
                                species of salamander found
                                only in the lakes of
                                Xochimilco near Mexico City,
                                has the extraordinary
                                ability to regenerate not
                                only its limbs but also its
                                heart and other vital
                                organs. Protecting axolotls
                                helps preserve this
                                remarkable trait, which has
                                significant potential for
                                scientific and medical
                                research, highlighting the
                                importance of biodiversity
                                conservation.
                            </p>
                            <footer className="text-sm  italic">
                                - Prana Curated Biodiversity
                                Facts
                                {/* - April 21st, 2024 */}
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
                            <span className="font-md text-foreground">
                                Version 0.1
                            </span>{' '}
                            available as of 4.22.24 🐣
                        </p>
                        {/* <p className="px-8 text-center text-sm text-muted-foreground">
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
                        </p> */}
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </>
    );
}
