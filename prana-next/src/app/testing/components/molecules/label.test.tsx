import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '@/app/components/molecules/label';

describe('Label', () => {
    it('renders with given text', () => {
        render(<Label>Test Label</Label>);
        expect(
            screen.getByText('Test Label'),
        ).toBeInTheDocument();
    });

    it('applies given className', () => {
        render(
            <Label className="custom-class">
                Test Label
            </Label>,
        );
        const labelElement = screen.getByText('Test Label');
        expect(labelElement).toHaveClass('custom-class');
        expect(labelElement).toHaveClass('text-sm');
    });
});
