import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Menu } from '@/app/components/organisms/contribute/menu';

describe('Menu Component', () => {
    it('renders menu triggers and some accessible items correctly', () => {
        render(<Menu />);

        // Check if the main menu triggers are present
        expect(
            screen.getByText('Music'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('File'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Edit'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('View'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Account'),
        ).toBeInTheDocument();
    });
});
