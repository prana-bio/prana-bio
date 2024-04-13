import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '@/app/components/organisms/research/article-card';

const mockArticle = {
    title: 'Sample Title',
    description: 'Sample Description',
    source: 'Sample Source',
    bookmarks: 100,
    date: '2023-09-14',
    image: 'sample-image.jpg',
};

describe('ArticleCard Component', () => {
    it('renders correctly', () => {
        render(<ArticleCard article={mockArticle} />);

        // Check for title, description, source, date
        expect(
            screen.getByText(mockArticle.title),
        ).toBeInTheDocument();
        expect(
            screen.getByText(mockArticle.description),
        ).toBeInTheDocument();
        expect(
            screen.getByText(mockArticle.source),
        ).toBeInTheDocument();
        expect(
            screen.getByText(mockArticle.date),
        ).toBeInTheDocument();

        // Check if image is rendered
        const image = screen.getByAltText('Article');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            'src',
            mockArticle.image,
        );
    });
});
