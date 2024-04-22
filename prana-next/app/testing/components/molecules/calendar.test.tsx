import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calendar } from '@/app/components/molecules/calendar';

describe('Calendar Component', () => {
    it('renders without crashing', () => {
        render(<Calendar />);
        expect(
            screen.getByRole('grid'),
        ).toBeInTheDocument();
    });

    it('applies custom styles correctly', () => {
        const { container } = render(
            <Calendar className="custom-class" />,
        );
        expect(container.firstChild).toHaveClass(
            'custom-class',
        );
    });
});
