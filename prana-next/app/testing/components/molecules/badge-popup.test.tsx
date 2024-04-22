import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgePopup } from '@/app/components/molecules/badge-popup';

describe('BadgePopup Component', () => {
    it('displays the badge SVG when provided', () => {
        const testSvg =
            '<svg><circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="red" /></svg>';
        render(<BadgePopup badgeSVG={testSvg} />);
        expect(
            screen.getByTestId('badge-svg'),
        ).toBeInTheDocument();
    });

    it('does not render badge SVG when not provided', () => {
        render(<BadgePopup />);
        expect(
            screen.queryByTestId('badge-svg'),
        ).not.toBeInTheDocument();
    });
});
