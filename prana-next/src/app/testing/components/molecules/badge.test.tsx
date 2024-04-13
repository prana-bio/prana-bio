import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/app/components/molecules/badge';

describe('Badge Component', () => {
    it('renders without crashing', () => {
        render(<Badge>Test Badge</Badge>);
        expect(
            screen.getByText('Test Badge'),
        ).toBeInTheDocument();
    });

    it('applies default variant styles', () => {
        const { container } = render(
            <Badge>Default Badge</Badge>,
        );
        expect(container.firstChild).toHaveClass(
            'bg-primary',
        );
    });

    it('applies secondary variant styles', () => {
        const { container } = render(
            <Badge variant="secondary">
                Secondary Badge
            </Badge>,
        );
        expect(container.firstChild).toHaveClass(
            'bg-secondary',
        );
    });

    it('applies custom class names', () => {
        const customClass = 'custom-class';
        const { container } = render(
            <Badge className={customClass}>
                Custom Class Badge
            </Badge>,
        );
        expect(container.firstChild).toHaveClass(
            customClass,
        );
    });

    it('is accessible', () => {
        render(
            <Badge aria-label="Accessible Badge">
                Accessible Badge
            </Badge>,
        );
        expect(
            screen.getByLabelText('Accessible Badge'),
        ).toBeInTheDocument();
    });
});
