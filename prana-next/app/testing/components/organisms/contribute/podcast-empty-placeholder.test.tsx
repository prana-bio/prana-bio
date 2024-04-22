import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PodcastEmptyPlaceholder } from '@/app/components/organisms/contribute/podcast-empty-placeholder';

describe('PodcastEmptyPlaceholder Component', () => {
    it('renders placeholder message and add podcast button', () => {
        render(<PodcastEmptyPlaceholder />);

        expect(
            screen.getByText('No episodes added'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'You have not added any podcasts. Add one below.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Add Podcast'),
        ).toBeInTheDocument();
    });
});
