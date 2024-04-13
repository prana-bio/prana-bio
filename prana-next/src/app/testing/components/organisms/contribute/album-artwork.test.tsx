import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlbumArtwork } from '@/app/components/organisms/contribute/album-artwork';

// Mock Next.js Image component
vi.mock('next/image', () => ({
    __esModule: true,
    default: vi
        .fn()
        .mockImplementation(({ src, alt }) => (
            <img src={src} alt={alt} />
        )),
}));

describe('AlbumArtwork Component', () => {
    const albumMock = {
        name: 'Test Album',
        artist: 'Test Artist',
        cover: '/test-cover.jpg',
    };

    it('renders album cover and details', () => {
        render(
            <AlbumArtwork
                album={albumMock}
                width={300}
                height={300}
            />,
        );

        // Check for the image alt text
        const image = screen.getByAltText(/test album/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            'src',
            '/test-cover.jpg',
        );

        // Check for album details
        expect(
            screen.getByText('Test Album'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Test Artist'),
        ).toBeInTheDocument();
    });
});
