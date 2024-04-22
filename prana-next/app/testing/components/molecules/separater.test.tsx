import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from '@/app/components/molecules/separator';

describe('Separator Component', () => {
    it('applies custom classes when provided', () => {
        const customClass = 'custom-class';
        const { container } = render(
            <Separator className={customClass} />,
        );

        const separatorElement = container.querySelector(
            `.${customClass}`,
        );
        expect(separatorElement).toBeInTheDocument();
        expect(separatorElement).toHaveClass(
            'h-[1px] w-full',
        );
    });
});
