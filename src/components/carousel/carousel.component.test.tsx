import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './carousel.component';

const items: React.ReactElement[] = [
    <div key={1}>Item One</div>,
    <div key={2}>Item Two</div>,
    <div key={3}>Item Three</div>,
    <div key={4}>Item Four</div>
];

describe('Carousel tests without prev and next items', () => {
    beforeEach(() => {
        render(<Carousel items={items} />);
    });

    it('should render the first item', () => {
        const text = items[0].props.children;
        
        const firstItem = screen.getByText(text);
        expect(firstItem).toBeInTheDocument();
    });

    it('should change the current item to the next item', async () => {
        const user = userEvent.setup();

        const text1 = items[0].props.children;
        const firstItem = screen.getByText(text1);
        
        expect(firstItem).toBeInTheDocument();
        
        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);
        
        const text2 = items[1].props.children;
        const secondItem = screen.getByText(text2);
        
        expect(firstItem).not.toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });
    
    it('should change the current item to the previous item', async () => {
        const user = userEvent.setup();

        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);

        const text2 = items[1].props.children;
        const secondItem = screen.getByText(text2);

        expect(secondItem).toBeInTheDocument();
        
        const prevButton = screen.getByRole('button', { name: 'Previous' });
        await user.click(prevButton);

        const text1 = items[0].props.children;
        const firstItem = screen.getByText(text1);
        
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).not.toBeInTheDocument();
        
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

describe('Carousel tests with prev and next items' , () => {
    beforeEach(() => {
        render(<Carousel items={items} prev next />);
    });

    it('should render the first three items', async () => {
        const user = userEvent.setup();

        // initally there is no previous item, so the next button needs to be clicked
        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);

        const text1 = items[0].props.children;
        const text2 = items[1].props.children;
        const text3 = items[2].props.children;
        
        const firstItem = screen.getByText(text1);
        const secondItem = screen.getByText(text2);
        const thirdItem = screen.getByText(text3);
    
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
    });

    it('should shift the displayed items one to the right (drop the previous item and bring in the next item)', async () => {
        const user = userEvent.setup();

        // initally there is no previous item, so the next button needs to be clicked
        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);
        
        const text1 = items[0].props.children;
        const text2 = items[1].props.children;
        const text3 = items[2].props.children;
        const text4 = items[2].props.children;
        
        await user.click(nextButton);

        const firstItem = screen.queryByText(text1);
        const secondItem = screen.getByText(text2);
        const thirdItem = screen.getByText(text3);
        const fourthItem = screen.getByText(text4);
    
        expect(firstItem).not.toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
        expect(fourthItem).toBeInTheDocument();
    });

    it('should shift the displayed items one to the left (bring in the previous previous item and drop the next item)', async () => {
        const user = userEvent.setup();

        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);
        await user.click(nextButton);
        
        const prevButton = screen.getByRole('button', { name: 'Previous' });
        await user.click(prevButton);
        
        const text1 = items[0].props.children;
        const text2 = items[1].props.children;
        const text3 = items[2].props.children;
        const text4 = items[3].props.children;

        const firstItem = screen.getByText(text1);
        const secondItem = screen.getByText(text2);
        const thirdItem = screen.getByText(text3);
        const fourthItem = screen.queryByText(text4);

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
        expect(fourthItem).not.toBeInTheDocument();
        
    });

    it('should display an empty placeholder for the previous item', () => {
        const placeholder = screen.getByTestId('prev-placeholder');

        expect(placeholder).toBeInTheDocument();
    });

    it('should display an empty placeholder for the next item', async () => {
        const user = userEvent.setup();
        
        const nextButton = screen.getByRole('button', { name: 'Next' });
        const amountNextItems = items.length - 1;
        
        for (let i = 1; i <= amountNextItems; i++) {
            await user.click(nextButton);
        }

        const placeholder = screen.getByTestId('next-placeholder');

        expect(placeholder).toBeInTheDocument();
    });
});