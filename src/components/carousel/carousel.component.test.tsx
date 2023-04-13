import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './carousel.component';

const items: React.ReactElement[] = [
    <div>Item One</div>,
    <div>Item Two</div>,
    <div>Item Three</div>,
    <div>Item Four</div>
];

describe('Carousel tests', () => {
    beforeEach(() => {
        render(<Carousel items={items} />);
    });

    it('should render the first item', () => {
        const text = items[0].props.children;
        
        const firstItem = screen.getByText(text);
        expect(firstItem).toBeInTheDocument();
    });

    it('should disable the previous button', () => {
        const prevButton = screen.getByRole('button', { name: 'Previous' });

        expect(prevButton).toBeDisabled();
    });

    it('should disable the next button', async () => {
        const user = userEvent.setup();

        const nextButton = screen.getByRole('button', { name: 'Next' });
        const amountNextItems = items.length - 1;
        
        for (let i = 1; i <= amountNextItems; i++) {
            await user.click(nextButton);
        }

        expect(nextButton).toBeDisabled();
    });
});