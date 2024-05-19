import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/nucleus/utils';
import { useTheme } from 'next-themes';

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                'flex items-center space-x-4 lg:space-x-6',
                className,
            )}
            {...props}
        >
            <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                    pathname === '/dashboard'
                        ? 'text-black dark:text-white'
                        : 'text-muted-foreground'
                } hover:text-primary`}
            >
                Dashboard
            </Link>
            <Link
                href="/mission"
                className={`disabled text-sm font-medium transition-colors ${
                    pathname === '/mission'
                        ? 'text-black dark:text-white'
                        : 'text-muted-foreground'
                } hover:text-primary`}
            >
                Mission
            </Link>
            <Link
                href="/charts"
                className={`disabled text-sm font-medium transition-colors ${
                    pathname === '/charts'
                        ? 'text-black dark:text-white'
                        : 'text-muted-foreground'
                } hover:text-primary`}
            >
                Charts
            </Link>
            {/* <Link
                href="/contribute"
                className={`disabled text-sm font-medium transition-colors ${
                    pathname === '/contribute'
                        ? 'text-black dark:text-white'
                        : 'text-muted-foreground'
                } hover:text-primary`}
            >
                Contribute
            </Link> */}
        </nav>
    );
}
