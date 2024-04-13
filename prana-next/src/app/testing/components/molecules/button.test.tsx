import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/app/components/molecules/button';

describe('Button Component', () => {
    it('renders without crashing', () => {
        render(<Button>Test Button</Button>);
        expect(
            screen.getByText('Test Button'),
        ).toBeInTheDocument();
    });

    it('applies default variant and size styles', () => {
        const { container } = render(
            <Button>Default Button</Button>,
        );
        expect(container.firstChild).toHaveClass(
            'bg-primary',
        );
        expect(container.firstChild).toHaveClass('h-9');
    });

    it('renders as a Slot component when asChild is true', () => {
        const { container } = render(
            <Button asChild>Slot Button</Button>,
        );
        expect(container.firstChild).not.toBeInstanceOf(
            HTMLButtonElement,
        );
    });
});
