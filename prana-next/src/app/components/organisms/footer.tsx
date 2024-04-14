import { Icons } from '@/app/components/atoms/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
    const pathname = usePathname();

    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <span className="flex items-center">
                        {`Support`}
                        <a
                            href={
                                'https://github.com/sponsors/prana-bio'
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 ml-1"
                        >
                            <Icons.gitHub className="h-4 w-4" />
                        </a>
                    </span>
                </p>
                {/* <Link
                    href="/mission"
                    className={`text-sm font-medium transition-colors ${
                        pathname === '/about-prana'
                            ? 'text-black dark:text-white'
                            : 'text-muted-foreground'
                    } hover:text-primary`}
                >
                    About Prana
                </Link> */}
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <span className="flex items-center">
                        {`Follow`}
                        <a
                            href={
                                'https://twitter.com/prana_bio'
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 ml-1"
                        >
                            <Icons.twitter className="h-3 w-3" />
                        </a>
                    </span>
                </p>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <span className="flex items-center">
                        {`Contribute`}
                        <a
                            href={
                                'https://github.com/prana-bio/prana-bio'
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 ml-1"
                        >
                            <Icons.gitHub className="h-4 w-4" />
                        </a>
                    </span>
                </p>
            </div>
        </footer>
    );
}
