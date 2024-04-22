import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContributionHistory } from '@/app/components/organisms/dashboard/birds-eye-view/contribution-history';

describe('ContributionHistory Component', () => {
    it('renders multiple contribution entries', () => {
        render(<ContributionHistory />);

        // Check for specific organization names
        expect(
            screen.getByText('Fundación ProAves'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('A Rocha Kenya'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Fundación Hábitat y Desarrollo',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Planet Madagascar Association',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Hutan'),
        ).toBeInTheDocument();

        // You can also check for other static texts like donation amounts
        expect(
            screen.getAllByText(/\+\$[0-9]+\.[0-9]{2}/),
        ).toHaveLength(5);
    });
});
