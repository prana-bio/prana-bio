import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/app/components/molecules/tabs';

describe('Tabs Component', () => {
    it('displays correct content for each tab', () => {
        render(
            <Tabs defaultValue="tab1">
                <TabsList aria-label="Test Tabs">
                    <TabsTrigger value="tab1">
                        Tab 1
                    </TabsTrigger>
                    <TabsTrigger value="tab2">
                        Tab 2
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    Content 1
                </TabsContent>
                <TabsContent value="tab2">
                    Content 2
                </TabsContent>
            </Tabs>,
        );

        // Check initial state - Content 1 should be in the document
        expect(
            screen.getByText('Content 1'),
        ).toBeInTheDocument();
    });
});
