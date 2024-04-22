'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';
import { Button } from '@/app/components/molecules/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/app/components/molecules/dropdown-menu';
import { useUserSession } from '@/app/nucleus/context/user-provider';
import { getInitials } from '@/app/nucleus/slice-and-dice';

export function UserNav() {
    const { userSession } = useUserSession();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            // clear http-only cookie on server
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            // clear local storage variables
            if (response.ok) {
                localStorage.removeItem('selectedTenantId');
                localStorage.removeItem('isAuthenticated');
                router.push('/');
            } else {
                console.error(
                    'Logout failed:',
                    response.statusText,
                );
            }
        } catch (error) {
            console.error(
                'An error occurred during logout:',
                error,
            );
        }
    };

    const navigateToSettings = () => {
        router.push('/settings');
    };

    const navigateHome = () => {
        router.push('/dashboard');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={userSession?.user?.picture}
                            alt=""
                        />
                        <AvatarFallback>
                            {' '}
                            {getInitials(
                                userSession.user
                                    .full_name || '',
                            )}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
                <DropdownMenuLabel
                    className="font-normal"
                    onClick={navigateToSettings}
                >
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {userSession.user.full_name ||
                                ''}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userSession.user.email || ''}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={navigateToSettings}
                    >
                        Settings
                        <DropdownMenuShortcut>
                            ⌘S
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>
                        ⇧⌘Q
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
