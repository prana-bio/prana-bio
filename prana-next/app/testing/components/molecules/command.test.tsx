import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    Command,
    CommandDialog,
    CommandShortcut,
} from '@/app/components/molecules/command';

describe('Command Component Suite', () => {
    it('renders Command without crashing', () => {
        render(<Command />);
    });

    it('renders CommandDialog and opens on trigger', () => {
        render(
            <CommandDialog open={true}>
                <Command />
            </CommandDialog>,
        );
    });

    it('CommandShortcut displays correct text', () => {
        render(<CommandShortcut>Ctrl + P</CommandShortcut>);
        expect(
            screen.getByText('Ctrl + P'),
        ).toBeInTheDocument();
    });
});
