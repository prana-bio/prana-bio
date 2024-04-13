import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/app/components/organisms/contribute/sidebar';

describe('Sidebar Component', () => {
    it('renders headings and buttons with correct icons', () => {
        const mockPlaylists = ['Playlist 1', 'Playlist 2'];

        render(<Sidebar playlists={mockPlaylists} />);

        // Verify headings
        expect(
            screen.getByText('Discover'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('My Catalog'),
        ).toBeInTheDocument();

        // Check for specific buttons
        expect(
            screen.getByText('Donate Now'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Browse'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Regions'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Countries'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Kingdoms'),
        ).toBeInTheDocument();
    });
});
