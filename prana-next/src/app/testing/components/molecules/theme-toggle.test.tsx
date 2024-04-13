import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeToggle } from '@/app/components/molecules/theme-toggle';

// Mocking useTheme hook
vi.mock('next-themes', () => ({
    useTheme: () => ({ setTheme: vi.fn() }),
}));

describe('ThemeToggle Component', () => {
    it('renders without errors', () => {
        render(<ThemeToggle />);
        expect(
            screen.getByRole('button', {
                name: 'Toggle theme',
            }),
        ).toBeInTheDocument();
    });
});
