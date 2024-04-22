import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
} from '@/app/components/molecules/dropdown-menu';

describe('DropdownMenu Component', () => {
    it('renders DropdownMenuTrigger', () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>
                    Open Dropdown {` `}
                </DropdownMenuTrigger>
            </DropdownMenu>,
        );

        // Assert that DropdownMenuTrigger content is rendered
        expect(
            screen.getByText('Open Dropdown'),
        ).toBeInTheDocument();
    });

    it('renders DropdownMenuLabel', () => {
        render(
            <DropdownMenu>
                <DropdownMenuLabel>
                    Dropdown Label
                </DropdownMenuLabel>
            </DropdownMenu>,
        );

        // Assert that DropdownMenuLabel content is rendered
        expect(
            screen.getByText('Dropdown Label'),
        ).toBeInTheDocument();
    });

    it('renders DropdownMenuSeparator', () => {
        render(
            <DropdownMenu>
                <DropdownMenuSeparator />
            </DropdownMenu>,
        );

        // Assert that DropdownMenuSeparator is rendered
        expect(
            screen.getByRole('separator'),
        ).toBeInTheDocument();
    });

    it('renders DropdownMenuShortcut', () => {
        render(
            <DropdownMenu>
                <DropdownMenuShortcut>
                    Shortcut
                </DropdownMenuShortcut>
            </DropdownMenu>,
        );

        // Assert that DropdownMenuShortcut content is rendered
        expect(
            screen.getByText('Shortcut'),
        ).toBeInTheDocument();
    });

    it('renders DropdownMenuGroup', () => {
        render(
            <DropdownMenu>
                <DropdownMenuGroup>
                    Group Content
                </DropdownMenuGroup>
            </DropdownMenu>,
        );

        expect(
            screen.getByText('Group Content'),
        ).toBeInTheDocument();
    });

    it('renders DropdownMenuRadioGroup', () => {
        render(
            <DropdownMenu>
                <DropdownMenuRadioGroup>
                    Radio Group Content
                </DropdownMenuRadioGroup>
            </DropdownMenu>,
        );

        expect(
            screen.getByText('Radio Group Content'),
        ).toBeInTheDocument();
    });
});
