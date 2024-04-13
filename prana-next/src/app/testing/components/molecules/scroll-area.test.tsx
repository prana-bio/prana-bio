import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollArea } from '@/app/components/molecules/scroll-area';

describe('ScrollArea and ScrollBar Components', () => {
    it('renders ScrollArea with content', () => {
        render(
            <ScrollArea>
                <div>Scrollable Content</div>
            </ScrollArea>,
        );

        expect(
            screen.getByText('Scrollable Content'),
        ).toBeInTheDocument();
    });

    it('applies custom className to ScrollArea', () => {
        const customClass = 'custom-scroll-area';
        render(
            <ScrollArea className={customClass}>
                <div>Content</div>
            </ScrollArea>,
        );

        const scrollArea = screen
            .getByText('Content')
            .closest('.relative');
        expect(scrollArea).toHaveClass(customClass);
    });
});
