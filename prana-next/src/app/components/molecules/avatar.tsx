import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/app/nucleus/utils';

type AvatarProps = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Root
> & {
    className?: string;
};

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        data-testid="avatar"
        className={cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
            className,
        )}
        {...props}
    />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

type AvatarImageProps = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Image
> & {
    className?: string;
};

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        data-testid="avatar-image" // Ensure this is correctly set
        className={cn(
            'aspect-square h-full w-full',
            className,
        )}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

type AvatarFallbackProps = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Fallback
> & {
    className?: string;
};

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        data-testid="avatar-fallback"
        className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted',
            className,
        )}
        {...props}
    />
));
AvatarFallback.displayName =
    AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
