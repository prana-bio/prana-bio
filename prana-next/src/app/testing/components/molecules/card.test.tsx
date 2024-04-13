import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/app/components/molecules/card';

describe('Card Components', () => {
    it('Card renders without crashing', () => {
        render(<Card>Card Content</Card>);
        expect(
            screen.getByText('Card Content'),
        ).toBeInTheDocument();
    });

    it('Card applies custom styles', () => {
        const customClass = 'custom-class';
        const { container } = render(
            <Card className={customClass}>
                Card Content
            </Card>,
        );
        expect(container.firstChild).toHaveClass(
            customClass,
        );
    });

    it('Card integrates subcomponents', () => {
        render(
            <Card>
                <CardTitle>Title</CardTitle>
                <CardHeader>Header</CardHeader>
                <CardDescription>
                    Description
                </CardDescription>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>,
        );
        expect(
            screen.getByText('Header'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Content'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Footer'),
        ).toBeInTheDocument();
    });
});
