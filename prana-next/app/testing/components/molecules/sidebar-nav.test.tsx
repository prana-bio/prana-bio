import '@testing-library/jest-dom';
import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
    vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { SidebarNav } from '@/app/components/molecules/sidebar-nav';

// Mock the entire 'next/navigation' module
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        pathname: '/active-path',
    }),
    usePathname: () => '/active-path',
}));

describe('SidebarNav Component', () => {
    it('renders items and applies active class based on current pathname', () => {
        const items = [
            { href: '/active-path', title: 'Active Item' },
            { href: '/other-path', title: 'Other Item' },
        ];

        render(<SidebarNav items={items} />);

        // Check that the first item has the active class
        const activeLink = screen.getByText('Active Item');
        expect(activeLink).toHaveClass(
            'bg-muted hover:bg-muted',
        );
        expect(activeLink.getAttribute('href')).toBe(
            '/active-path',
        );

        // Check that the second item does not have the active class
        const otherLink = screen.getByText('Other Item');
        expect(otherLink).not.toHaveClass(
            'bg-muted hover:bg-muted',
        );
        expect(otherLink.getAttribute('href')).toBe(
            '/other-path',
        );
    });
});
