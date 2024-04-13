import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MyBadges } from '@/app/components/organisms/dashboard/my-impact/my-badges';

describe('MyBadges Component', () => {
    it('renders badge SVGs for each badge', () => {
        const { container } = render(<MyBadges />);

        const svgs = container.querySelectorAll('svg');
        expect(svgs.length).toBe(3);
    });
});
