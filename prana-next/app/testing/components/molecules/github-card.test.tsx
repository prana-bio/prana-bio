import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoGithub } from '@/app/components/molecules/github-card';

describe('DemoGithub', () => {
    it('renders without errors', () => {
        render(<DemoGithub />);

        expect(
            screen.getByText('shadcn/ui'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Beautifully designed components built with Radix UI and Tailwind CSS.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Star'),
        ).toBeInTheDocument();
    });
});
