import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/app/components/molecules/radio-group';

describe('RadioGroup and RadioGroupItem Components', () => {
    it('renders radio group with items', () => {
        render(
            <RadioGroup>
                <RadioGroupItem value="item1" />
                <RadioGroupItem value="item2" />
            </RadioGroup>,
        );

        const items = screen.getAllByRole('radio');
        expect(items).toHaveLength(2);
    });

    it('allows selecting a radio item', () => {
        render(
            <RadioGroup>
                <RadioGroupItem value="option1" />
                <RadioGroupItem value="option2" />
            </RadioGroup>,
        );

        const firstRadio = screen.getAllByRole('radio')[0];
        fireEvent.click(firstRadio);

        // Check if the first radio item is checked
        expect(firstRadio).toBeChecked();
    });
    it('only one radio item can be selected at a time', () => {
        render(
            <RadioGroup>
                <RadioGroupItem value="item1" />
                <RadioGroupItem value="item2" />
            </RadioGroup>,
        );

        const [firstItem, secondItem] =
            screen.getAllByRole('radio');
        fireEvent.click(firstItem);
        expect(firstItem).toBeChecked();
        expect(secondItem).not.toBeChecked();

        fireEvent.click(secondItem);
        expect(secondItem).toBeChecked();
        expect(firstItem).not.toBeChecked();
    });
});
