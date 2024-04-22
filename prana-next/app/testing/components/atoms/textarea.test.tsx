import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from '@/app/components/atoms/textarea';

describe('Textarea Component', () => {
    it('renders without crashing', () => {
        render(<Textarea />);
        const textareaElement = screen.getByRole('textbox');
        expect(textareaElement).toBeInTheDocument();
    });

    it('handles defaultValue prop for uncontrolled components', () => {
        const value = 'Hello World';
        render(<Textarea defaultValue={value} />);
        const textareaElement =
            screen.getByDisplayValue(value);
        expect(textareaElement).toBeInTheDocument();
    });

    it('handles value prop for controlled components', () => {
        const value = 'Hello World';
        render(
            <Textarea value={value} onChange={() => {}} />,
        );
        const textareaElement =
            screen.getByDisplayValue(value);
        expect(textareaElement).toBeInTheDocument();
    });

    it('applies className prop', () => {
        const className = 'test-class';
        render(<Textarea className={className} />);
        const textareaElement = screen.getByRole('textbox');
        expect(textareaElement).toHaveClass(className);
    });

    it('is accessible with a placeholder', () => {
        render(
            <Textarea placeholder="Enter your message" />,
        );
        const textareaElement = screen.getByPlaceholderText(
            'Enter your message',
        );
        expect(textareaElement).toBeInTheDocument();
    });
});
