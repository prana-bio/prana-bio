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
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/app/components/molecules/popover';

describe('Popover Component', () => {
    // Cleanup the DOM after each test
    afterEach(cleanup);

    it('renders PopoverTrigger and PopoverContent', () => {
        render(
            <Popover>
                <PopoverTrigger>
                    Open Popover {` `}
                </PopoverTrigger>
                <PopoverContent>
                    Popover Content
                </PopoverContent>
            </Popover>,
        );

        // Assert that PopoverTrigger content is rendered
        expect(
            screen.getByText('Open Popover'),
        ).toBeInTheDocument();

        // Click the button to open the popover
        fireEvent.click(screen.getByText('Open Popover'));

        // Assert that PopoverContent is rendered
        expect(
            screen.getByText('Popover Content'),
        ).toBeInTheDocument();
    });

    it('closes the popover when the button is clicked again', () => {
        render(
            <Popover>
                <PopoverTrigger>
                    Open Popover{' '}
                </PopoverTrigger>
                <PopoverContent>
                    Popover Content
                </PopoverContent>
            </Popover>,
        );

        // Click the button to open the popover
        fireEvent.click(screen.getByText('Open Popover'));

        // Click the button again to close the popover
        fireEvent.click(screen.getByText('Open Popover'));

        // Assert that PopoverContent is not rendered
        expect(
            screen.queryByText('Popover Content'),
        ).toBeNull();
    });
});
