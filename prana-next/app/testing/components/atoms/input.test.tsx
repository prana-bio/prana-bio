import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/app/components/atoms/input';

describe('Input Component', () => {
    it('renders without crashing', () => {
        render(<Input />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    it('handles defaultValue prop for uncontrolled input components', () => {
        const value = 'Hello World';
        render(<Input defaultValue={value} />);
        const inputElement =
            screen.getByDisplayValue(value);
        expect(inputElement).toBeInTheDocument();
    });

    it('handles value prop for controlled input components', () => {
        const value = 'Hello World';
        render(<Input value={value} onChange={() => {}} />);
        const inputElement =
            screen.getByDisplayValue(value);
        expect(inputElement).toBeInTheDocument();
    });

    it('handles value prop', () => {
        const value = 'Hello World';
        render(<Input value={value} readOnly />);
        const inputElement =
            screen.getByDisplayValue(value);
        expect(inputElement).toBeInTheDocument();
    });

    it('handles type prop', () => {
        render(
            <Input type="password" aria-label="Password" />,
        );
        const inputElement =
            screen.getByLabelText('Password');
        expect(inputElement).toHaveAttribute(
            'type',
            'password',
        );
    });

    it('applies className prop', () => {
        const className = 'test-class';
        render(<Input className={className} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass(className);
    });
});
