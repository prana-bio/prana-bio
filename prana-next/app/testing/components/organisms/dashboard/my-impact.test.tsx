import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyImpact from '@/app/components/organisms/dashboard/my-impact/my-impact';

// Mock ResizeObserver
beforeEach(() => {
    global.ResizeObserver = class ResizeObserverMock {
        callback: ResizeObserverCallback;

        constructor(callback: ResizeObserverCallback) {
            this.callback = callback;
        }

        observe() {
            // Mock observe method
        }

        disconnect() {
            // Mock disconnect method
        }

        unobserve() {
            // Mock unobserve method
        }
    };
});

describe('MyImpact Component', () => {
    it('renders the MyImpact component with essential elements', () => {
        render(<MyImpact />);

        // Check for the presence of key elements
        expect(
            screen.getByText('Area Protected'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Trees Planted'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Land Species Protected'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Marine Species Protected'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('My Contributions'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Contribution History'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Badges'),
        ).toBeInTheDocument();
    });
});
