import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { Switch } from '@/app/components/molecules/switch';
import { useState } from 'react';

describe('Switch Component', () => {
    it('toggles state on click', () => {
        // Simulate external state management
        const Component = () => {
            const [checked, setChecked] = useState(false);
            return (
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            );
        };

        render(<Component />);

        // Find the switch
        const switchElement = screen.getByRole('switch');
        expect(switchElement).not.toBeChecked();

        // Simulate clicking the switch
        fireEvent.click(switchElement);

        // Check if the switch is now "on"
        expect(switchElement).toBeChecked();
    });
});
