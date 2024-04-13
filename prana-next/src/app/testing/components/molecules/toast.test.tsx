import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
} from '@/app/components/molecules/toast';

describe('Toast Component', () => {
    it('renders the toast with title, description, and close button', () => {
        render(
            <ToastProvider>
                <ToastViewport>
                    <Toast open duration={0}>
                        <ToastTitle>Title</ToastTitle>
                        <ToastDescription>
                            Description
                        </ToastDescription>
                        <ToastClose />
                    </Toast>
                </ToastViewport>
            </ToastProvider>,
        );

        // Check if the toast is rendered
        expect(
            screen.getByText('Title'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Description'),
        ).toBeInTheDocument();

        // Check if the close button is rendered
        expect(
            screen.getByRole('button'),
        ).toBeInTheDocument();
    });
});
