import TeamSwitcher from '@/app/components/organisms/team-switcher';
import { MainNav } from '@/app/components/organisms/main-nav';
import { Search } from '@/app/components/molecules/search';
import Image from 'next/image';
import { UserNav } from '@/app/components/organisms/user-nav';
import { ThemeToggle } from '@/app/components/molecules/theme-toggle';
import Link from 'next/link';

export function Header() {
    return (
        <>
            <style jsx>{`
                @keyframes floatPulse {
                    0%,
                    100% {
                        transform: translateY(-0.25px)
                            scale(1) rotateY(0deg);
                    }
                    50% {
                        transform: translateY(1px)
                            scale(1.1) rotateY(5deg);
                    }
                }
                .logo {
                    animation: floatPulse 3s ease-in-out
                        infinite;
                    display: block;
                    filter: drop-shadow(
                        2px 2px 5px rgba(0, 0, 0, 0.35)
                    ); /* Example shadow: horizontal offset, vertical offset, blur radius, color */
                }
            `}</style>
            <header>
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex-none pr-3">
                            <Link
                                href="/dashboard"
                                passHref
                            >
                                <div className="logo">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width={35}
                                        height={35}
                                    />
                                </div>
                            </Link>
                        </div>
                        <TeamSwitcher />
                        <MainNav className="mx-4" />
                        <div className="ml-auto flex items-center space-x-4">
                            {/* <Search /> */}
                            <ThemeToggle />
                            <UserNav />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
