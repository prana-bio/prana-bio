import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from '@/app/components/molecules/checkbox';

describe('Checkbox Component', () => {
    it('renders without crashing', () => {
        render(<Checkbox />);
        expect(
            screen.getByRole('checkbox'),
        ).toBeInTheDocument();
    });

    it('applies custom styles', () => {
        const customClass = 'custom-class';
        const { container } = render(
            <Checkbox className={customClass} />,
        );
        expect(container.firstChild).toHaveClass(
            customClass,
        );
    });

    it('is accessible', () => {
        render(
            <Checkbox aria-label="Accessible Checkbox" />,
        );
        expect(
            screen.getByLabelText('Accessible Checkbox'),
        ).toBeInTheDocument();
    });
});
