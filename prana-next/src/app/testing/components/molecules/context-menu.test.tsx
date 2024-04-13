import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from '@/app/components/molecules/context-menu';

describe('ContextMenu Component Suite', () => {
    beforeEach(() => {
        render(
            <ContextMenu>
                <ContextMenuTrigger>
                    Right Click Me
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        Option 1
                    </ContextMenuItem>
                    <ContextMenuCheckboxItem checked>
                        Checkbox Item
                    </ContextMenuCheckboxItem>
                    <ContextMenuRadioItem value="">
                        Radio Item
                    </ContextMenuRadioItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            Sub Menu
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem>
                                Sub Option 1
                            </ContextMenuItem>
                            <ContextMenuItem>
                                Sub Option 2
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuContent>
            </ContextMenu>,
        );
    });

    it('renders ContextMenuTrigger and opens ContextMenuContent', () => {
        fireEvent.contextMenu(
            screen.getByText('Right Click Me'),
        );
        expect(screen.getByText('Option 1')).toBeVisible();
        expect(
            screen.getByText('Checkbox Item'),
        ).toBeVisible();
        expect(
            screen.getByText('Radio Item'),
        ).toBeVisible();
    });

    it('toggles ContextMenuCheckboxItem', () => {
        fireEvent.contextMenu(
            screen.getByText('Right Click Me'),
        );
        const checkboxItem =
            screen.getByText('Checkbox Item');
        expect(checkboxItem).toBeChecked();
    });

    it('selects ContextMenuRadioItem', () => {
        fireEvent.contextMenu(
            screen.getByText('Right Click Me'),
        );
        const radioItem = screen.getByText('Radio Item');
        fireEvent.click(radioItem);
        expect(radioItem).not.toBeChecked();
    });
});
