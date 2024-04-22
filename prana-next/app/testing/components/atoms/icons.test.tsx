import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icons } from '@/app/components/atoms/icons';

type IconComponentType = React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
>;
type IconsType = { [key: string]: IconComponentType };

describe('Icon Component', () => {
    // Test for rendering each icon
    it.each(Object.keys(Icons))(
        'renders %s icon without crashing',
        (iconName) => {
            const Icon = (Icons as IconsType)[iconName];
            render(
                <Icon data-testid={`${iconName}-icon`} />,
            );
            const svgElement = screen.getByTestId(
                `${iconName}-icon`,
            );
            expect(svgElement).toBeInTheDocument();
        },
    );

    // Test for prop forwarding
    it('forwards additional props to the SVG element', () => {
        const ariaLabel = 'test-label';
        const className = 'test-class';
        const TestIcon = Icons.logo;
        render(
            <TestIcon
                aria-label={ariaLabel}
                className={className}
                data-testid="logo-icon"
            />,
        );
        const svgElement = screen.getByTestId('logo-icon');
        expect(svgElement).toHaveAttribute(
            'aria-label',
            ariaLabel,
        );
        expect(svgElement).toHaveClass(className);
    });
});
