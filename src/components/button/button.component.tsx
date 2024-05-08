import React, { useContext } from 'react';
import { ColorThemeContext } from '../color-theme/color-theme.component';

import './button.styles.scss';

interface Props {
    children: React.ReactNode
    onClick: Function
    color?: string
    size?: 'small' | 'medium' | 'large'
}

const Button: React.FC<Props> = ({ color, children, size='medium', onClick }) => {
    const colorTheme = useContext(ColorThemeContext)
    
    return (
        <button
            className={`button ${size}`}
            onClick={e => onClick(e)}
            style={ color ? { backgroundColor: colorTheme[color] }: undefined}
        >
            {children}
        </button>
    );
}

export default Button;