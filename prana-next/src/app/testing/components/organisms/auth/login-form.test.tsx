import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { LogInForm } from '@/app/components/organisms/auth/login-form';

describe('LogInForm Component', () => {
    it('renders input fields and submit button', () => {
        render(
            <LogInForm
                onSuccess={vi.fn()}
                onError={vi.fn()}
            />,
        );

        expect(
            screen.getByLabelText(/email/i),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/password/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', {
                name: /sign in/i,
            }),
        ).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        render(
            <LogInForm
                onSuccess={vi.fn()}
                onError={vi.fn()}
            />,
        );

        const emailInput = screen.getByLabelText(
            /email/i,
        ) as HTMLInputElement;
        fireEvent.change(emailInput, {
            target: { value: 'test@example.com' },
        });
        expect(emailInput.value).toBe('test@example.com');

        const passwordInput = screen.getByLabelText(
            /password/i,
        ) as HTMLInputElement;
        fireEvent.change(passwordInput, {
            target: { value: 'password123' },
        });
        expect(passwordInput.value).toBe('password123');
    });
});
