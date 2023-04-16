import { useContext } from 'react';
import { ColorThemeContext } from '../color-theme/color-theme.component';

import './card.styles.scss';

interface Props {
    frontTitle?: string,
    backTitle?: string,
    frontText?: string,
    backText?: string,
    colorFront?: string
    colorBack?: string
}

const Card: React.FC<Props> = ({ frontTitle, frontText, backTitle, backText, colorFront, colorBack}) => {
    const colorTheme = useContext(ColorThemeContext);

    return (
        <div className='card' data-testid='card' >
            <div
                className='side front'
                style={
                    colorFront
                    ? { backgroundColor: colorTheme[colorFront]}
                    : undefined
                }
                data-testid='card-front'
            >
                {
                    frontTitle
                    ?
                        <div className='shadow'>
                            <div className='title-container title-front'>
                                <h1 className='title'>{frontTitle}</h1>
                            </div>
                        </div>
                    : null
                }
                {
                    frontText
                    ? 
                        <div className={`text-container ${!frontTitle ? 'flex-grow1' : ''}`}>
                            <p className='text'>{frontText}</p>
                        </div>
                    : null
                }
            </div>
            <div
                className='side back'
                style={
                    colorBack
                    ? { backgroundColor: colorTheme[colorBack]}
                    : undefined
                }
                data-testid='card-back'
            >
                {
                    backTitle
                    ?
                        <div className='shadow'>
                            <div className='title-container title-back'>
                                <h1 className='title'>{backTitle}</h1>
                            </div>
                    </div>
                    : null
                }
                {
                    backText
                    ? 
                        <div className={`text-container ${!backTitle ? 'flex-grow1' : ''}`}>
                            <p className='text'>{backText}</p>
                        </div>
                    : null
                }
            </div>
        </div>
    );
}

export default Card;