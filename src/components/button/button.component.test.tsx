import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Button from './button.component'
import ColorTheme from '../color-theme/color-theme.component';

describe('Button tests', () => {
    it('should call onClick function', async () => {
        const fn = vi.fn();
        const user = userEvent.setup()

        render(
            <Button
                onClick={fn}
            >Click Here</Button>
        );

        const button = screen.getByRole('button');

        await user.click(button)
        
        expect(fn).toHaveBeenCalledOnce();
    });

    it('should set the background color to the color prop', () => {
        const fn = vi.fn();
        const colorTheme = {
            primary: '#D14551',
            secondary: '#5181E8'
        };

        render(
            <ColorTheme colors={colorTheme}>
                <Button
                    onClick={fn}
                    color='primary'
                >Click Here</Button>
            </ColorTheme>
        );

        const button = screen.getByRole('button');
        
        expect(button).toHaveStyle(`background-color: ${colorTheme['primary']}`);
    });

    it('should set the size to the default (medium)', () => {
        const fn = vi.fn();

        render(
            <Button
                onClick={fn}
            >Click Here</Button>
        );

        const button = screen.getByRole('button');
        
        expect(button).toHaveClass('medium');
    });

    it('should set the size to small', () => {
        const fn = vi.fn();

        render(
            <Button
                onClick={fn}
                size='small'
            >Click Here</Button>
        );

        const button = screen.getByRole('button');
        
        expect(button).toHaveClass('small');
    });
});