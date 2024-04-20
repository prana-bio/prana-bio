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
            <style jsx>{`
                @keyframes floatPulse {
                    0%,
                    100% {
                        transform: translateY(-1px) scale(1)
                            rotateY(0deg);
                    }
                    50% {
                        transform: translateY(3px)
                            scale(1.1) rotateY(5deg);
                    }
                }
                .logo {
                    animation: floatPulse 3s ease-in-out
                        infinite;
                    display: block;
                    filter: drop-shadow(
                        5px 5px 5px rgba(0, 0, 0, 0.5)
                    ); /* Example shadow: horizontal offset, vertical offset, blur radius, color */
                }
            `}</style>
            <div className="md:hidden">
                {/* <Image
                    src="/orca.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden h-screen object-cover"
                /> */}
                {/* <Image
                    src="/logo.png"
                    width={180}
                    height={843}
                    alt="Authentication"
                    className=" h-screen object-cover"
                /> */}
                <Image
                    src="/orca.jpg"
                    alt="Logo"
                    width={500}
                    height={500}
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
                        <div className="logo">
                            <Image
                                src="/file2.png"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>

                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Biodiversity is the
                                symphony of life, a melodic
                                ensemble of species and
                                habitats that weave together
                                a tapestry more stunning
                                than the threads of any
                                single creature. As each
                                note resonates with the
                                next, let us join in harmony
                                to protect this precious
                                orchestra, for in its music
                                lies the warmth of the
                                world&apos;s heart, beating
                                in rhythm with our
                                own.&rdquo;
                            </p>
                            <footer className="text-sm">
                                - Prana Development Team
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
                            {/* In{' '} */}
                            <span className="font-semibold text-foreground">
                                Version 0.1.0
                            </span>{' '}
                            available as of 4.22.24 🚀
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
