import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/app/components/molecules/theme-toggle';

const SideNav: React.FC = () => {
    return (
        <div className="bg-black bg-opacity-40 backdrop-blur-sm w-16 h-full flex flex-col items-center border-r-2 border-gray-400">
            <div className="pt-4">
                <Link href="/" passHref>
                    <div className="block hover:bg-opacity-0 pb-4 hover:translate-y-1">
                        Logout
                    </div>
                </Link>
                <Link href="/dashboard/filters" passHref>
                    <div className="block hover:bg-opacity-0 hover:translate-y-1 pt-4">
                        Filters
                    </div>
                </Link>
                <Link href="/dashboard/viz" passHref>
                    <div className="block hover:bg-opacity-0 hover:translate-y-1 pt-4">
                        Charts
                    </div>
                </Link>
                <Link href="/dashboard/settings" passHref>
                    <div className="block hover:bg-opacity-0 hover:translate-y-1 pt-4">
                        Settings
                    </div>
                </Link>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default SideNav;
