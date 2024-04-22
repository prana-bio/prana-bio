import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectValue,
    SelectGroup,
    SelectSeparator,
} from '@/app/components/molecules/select';

describe('Select Component', () => {
    it('renders the select trigger', () => {
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
            </Select>,
        );
        const triggerElement = screen.getByRole('combobox');
        expect(triggerElement).toBeInTheDocument();
    });

    it('renders the select label', () => {
        render(
            <Select>
                <SelectGroup>
                    <SelectLabel>Label</SelectLabel>
                    <SelectSeparator></SelectSeparator>
                </SelectGroup>
            </Select>,
        );
        const labelElement = screen.getByText('Label');
        expect(labelElement).toBeInTheDocument();
    });

    it('renders the select item', () => {
        render(
            <Select>
                <SelectContent>
                    <SelectItem value="item">
                        Item
                    </SelectItem>
                </SelectContent>
            </Select>,
        );
        const itemElement = screen.getByText('Item');
        expect(itemElement).toBeInTheDocument();
    });
});
