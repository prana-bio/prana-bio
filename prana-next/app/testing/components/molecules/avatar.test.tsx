import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';

describe('Avatar Component', () => {
    it('renders Avatar without crashing', () => {
        render(<Avatar />);
        const avatarElement = screen.getByTestId('avatar');
        expect(avatarElement).toBeInTheDocument();
    });

    it('applies className prop to Avatar', () => {
        const className = 'test-avatar-class';
        render(
            <Avatar
                className={className}
                data-testid="avatar"
            />,
        );
        const avatarElement = screen.getByTestId('avatar');
        expect(avatarElement).toHaveClass(className);
    });

    it('renders AvatarFallback when no image is provided', () => {
        render(
            <Avatar>
                <AvatarFallback data-testid="avatar-fallback">
                    FB
                </AvatarFallback>
            </Avatar>,
        );
        const avatarFallback = screen.getByTestId(
            'avatar-fallback',
        );
        expect(avatarFallback).toBeInTheDocument();
        expect(avatarFallback).toHaveTextContent('FB');
    });

    it('displays AvatarFallback when AvatarImage fails to load', async () => {
        render(
            <Avatar>
                <AvatarImage
                    src="invalid-url.jpg"
                    data-testid="avatar-image"
                />
                <AvatarFallback data-testid="avatar-fallback">
                    FB
                </AvatarFallback>
            </Avatar>,
        );
        // You might need to use findByTestId if the image loading affects rendering asynchronously
        const avatarFallback = await screen.findByTestId(
            'avatar-fallback',
        );
        expect(avatarFallback).toBeInTheDocument();
    });

    it('passes accessibility attributes correctly to Avatar', () => {
        render(
            <Avatar
                aria-label="User avatar"
                data-testid="avatar"
            />,
        );
        const avatarElement = screen.getByTestId('avatar');
        expect(avatarElement).toHaveAttribute(
            'aria-label',
            'User avatar',
        );
    });

    it('forwards props correctly to AvatarPrimitive.Root', () => {
        render(
            <Avatar id="custom-id" data-testid="avatar" />,
        );
        const avatarElement = screen.getByTestId('avatar');
        expect(avatarElement).toHaveAttribute(
            'id',
            'custom-id',
        );
    });
});
