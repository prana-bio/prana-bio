import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from '@/app/components/molecules/form';
import { FormProvider, useForm } from 'react-hook-form';

type WrapperProps = {
    children: React.ReactNode;
};

// Create a wrapper component that includes FormProvider
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const methods = useForm();
    return (
        <FormProvider {...methods}>{children}</FormProvider>
    );
};

describe('FormItem', () => {
    it('renders its children', () => {
        render(
            <FormItem>
                <div>Child Component</div>
            </FormItem>,
        );
        expect(
            screen.getByText('Child Component'),
        ).toBeInTheDocument();
    });
});

describe('FormLabel', () => {
    it('renders correctly within FormProvider', () => {
        render(
            <Wrapper>
                <FormLabel>Test Label</FormLabel>
            </Wrapper>,
        );

        expect(
            screen.getByText('Test Label'),
        ).toBeInTheDocument();
    });
});

describe('FormDescription', () => {
    it('renders correctly within FormProvider and contexts', () => {
        render(
            <Wrapper>
                <FormItem>
                    <FormDescription>
                        Test Description
                    </FormDescription>
                </FormItem>
            </Wrapper>,
        );
        expect(
            screen.getByText('Test Description'),
        ).toBeInTheDocument();
    });
});

describe('FormMessage', () => {
    it('renders correctly within FormProvider and contexts', () => {
        render(
            <Wrapper>
                <FormItem>
                    <FormMessage>Test Message</FormMessage>
                </FormItem>
            </Wrapper>,
        );
        expect(
            screen.getByText('Test Message'),
        ).toBeInTheDocument();
    });
});
