import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import DefaultLogin from '@/app/components/organisms/auth/default-login';

// Mock useRouter
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

// Mock NileContext
vi.mock('@/app/nucleus/context/auth-provider', () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => (
        <>{children}</>
    ),
}));

describe('DefaultLogin Component', () => {
    it('renders correctly', () => {
        render(<DefaultLogin />);

        // Check for images
        expect(
            screen.getAllByAltText('Authentication'),
        ).toHaveLength(2);

        // Check for Create Account link
        expect(
            screen.getByText('Create Account'),
        ).toBeInTheDocument();

        // Check for welcome text
        expect(
            screen.getByText('Welcome back 🐳'),
        ).toBeInTheDocument();

        // Check for LogInForm component (mocked or real)
        expect(
            screen.getByText(
                'Sign in with your email below.',
            ),
        ).toBeInTheDocument();

        // Check for ThemeToggle component (mocked or real)
        expect(
            screen.getByText('Toggle theme'),
        ).toBeInTheDocument();
    });
});
