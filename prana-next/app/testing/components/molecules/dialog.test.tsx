import '@testing-library/jest-dom';
import { describe, it, expect, afterEach } from 'vitest';
import {
    render,
    screen,
    fireEvent,
    cleanup,
} from '@testing-library/react';
import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/app/components/molecules/dialog';

describe('Dialog Component', () => {
    // Cleanup the DOM after each test
    afterEach(cleanup);

    it('closes the dialog when the close button is clicked', () => {
        render(
            <Dialog>
                <DialogTrigger>Open Dialog </DialogTrigger>
                <DialogContent>
                    <DialogClose>Close Dialog</DialogClose>{' '}
                </DialogContent>
            </Dialog>,
        );

        // Click the button to open the dialog
        fireEvent.click(screen.getByText('Open Dialog'));

        // Click the close button to close the dialog
        fireEvent.click(screen.getByText('Close Dialog'));

        // Assert that the dialog is closed
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('renders DialogTrigger', () => {
        render(
            <Dialog>
                <DialogTrigger>
                    Open Dialog {` `}
                </DialogTrigger>
            </Dialog>,
        );

        expect(
            screen.getByText('Open Dialog'),
        ).toBeInTheDocument();
    });

    it('renders DialogHeader', () => {
        render(
            <Dialog>
                <DialogHeader>Dialog Header</DialogHeader>
            </Dialog>,
        );

        expect(
            screen.getByText('Dialog Header'),
        ).toBeInTheDocument();
    });

    it('renders DialogDescription', () => {
        render(
            <Dialog>
                <DialogDescription>
                    Dialog Description
                </DialogDescription>
            </Dialog>,
        );

        expect(
            screen.getByText('Dialog Description'),
        ).toBeInTheDocument();
    });

    it('renders DialogFooter', () => {
        render(
            <Dialog>
                <DialogFooter>Dialog Footer</DialogFooter>
            </Dialog>,
        );

        expect(
            screen.getByText('Dialog Footer'),
        ).toBeInTheDocument();
    });

    it('renders DialogTitle', () => {
        render(
            <Dialog>
                <DialogTitle>Dialog Title</DialogTitle>
            </Dialog>,
        );

        expect(
            screen.getByText('Dialog Title'),
        ).toBeInTheDocument();
    });
});
