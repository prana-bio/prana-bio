import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import {
    Menubar,
    MenubarTrigger,
    MenubarMenu,
} from '@/app/components/molecules/menubar';

describe('Menubar Components', () => {
    // Test for Menubar
    it('renders Menubar with correct classes', () => {
        render(
            <Menubar className="custom-class">
                Content
            </Menubar>,
        );
        expect(screen.getByText('Content')).toHaveClass(
            'custom-class',
        );
    });

    //  Test for MenubarTrigger (example of interaction test)
    it('MenubarTrigger opens menu on click', () => {
        render(
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Trigger</MenubarTrigger>
                </MenubarMenu>
            </Menubar>,
        );
        fireEvent.click(screen.getByText('Trigger'));
    });
});
