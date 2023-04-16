import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './card.component';

describe('Card tests', () => {
    beforeEach(() => {
        render(
            <Card
                frontTitle='Front Title'
                frontText='Front text'
                backTitle='Back Title'
                backText='Back text'
                colorFront='#ff0000'
                colorBack='#0000ff'
            />
        );
    });

    it('should display front title and text', () => {
        const frontTitle = screen.getByText('Front Title');
        const frontText = screen.getByText('Front text');
        expect(frontTitle).toBeVisible();
        expect(frontText).toBeVisible();
    });

    it('should display back title and text', () => {
        const user = userEvent.setup();

        const card = screen.getByTestId('card');
        user.hover(card);
        
        const backTitle = screen.getByText('Back Title');
        const backText = screen.getByText('Back text');
        expect(backTitle).toBeVisible();
        expect(backText).toBeVisible();
    });

    it('should set the background color of the front side', () => {
        const frontSide = screen.getByTestId('card-front');

        expect(frontSide).toHaveStyle('backgroundColor: #ff0000');
    });

    it('should set the background color of the back side', () => {
        const backSide = screen.getByTestId('card-back');

        expect(backSide).toHaveStyle('backgroundColor: #0000ff');
    });
});