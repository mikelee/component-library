import { createContext } from 'react';

interface Colors {
    [key: string]: string
}

interface Props {
    children: React.ReactElement
    colors: Colors
}

const defaultColorTheme: Colors = {
    primary: '#EB4D4D',
    secondary: '#4DEB5D',
    tertiary: '#4D6DEB'
}

const ColorThemeContext: React.Context<Colors> = createContext(defaultColorTheme);

const ColorTheme: React.FC<Props> = ({ children, colors }) => (
    <ColorThemeContext.Provider value={colors}>
        {children}
    </ColorThemeContext.Provider>
);

export default ColorTheme;