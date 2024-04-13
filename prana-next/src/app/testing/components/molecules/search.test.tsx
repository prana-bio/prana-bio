import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from '@/app/components/molecules/search';

describe('Search Component', () => {
    it('renders input with the correct placeholder', () => {
        render(<Search />);
        const inputElement =
            screen.getByPlaceholderText('Search...');
        expect(inputElement).toBeInTheDocument();
    });

    it('renders input with the correct type', () => {
        render(<Search />);
        const inputElement =
            screen.getByPlaceholderText('Search...');
        expect(inputElement).toHaveAttribute(
            'type',
            'search',
        );
    });

    it('renders input with the correct initial width', () => {
        render(<Search />);
        const inputElement =
            screen.getByPlaceholderText('Search...');
        expect(inputElement).toHaveClass('md:w-[100px]');
    });

    // Additional tests can be added to cover different scenarios, such as responsive behavior or interaction tests if necessary
});
