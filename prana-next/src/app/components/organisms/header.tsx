import TeamSwitcher from '@/app/components/organisms/team-switcher';
import { MainNav } from '@/app/components/organisms/main-nav';
import { Search } from '@/app/components/molecules/search';
import Image from 'next/image';
import { UserNav } from '@/app/components/organisms/user-nav';
import { ThemeToggle } from '@/app/components/molecules/theme-toggle';

export function Header() {
    return (
        <header>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="flex-none pr-3">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
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
    );
}
