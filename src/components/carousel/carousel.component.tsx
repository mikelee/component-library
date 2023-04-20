import React, { useContext, useState } from 'react';
import { ColorThemeContext } from '../color-theme/color-theme.component';

import './carousel.styles.scss';
import { ReactComponent as ArrowIcon} from '../../assets/arrow_right.svg';

import MultipleItems from './multiple-items.component';
import OneItem from './one-item.component';

interface Props {
    items: any[],
    color?: string,
    prev?: boolean,
    next?: boolean
}

const Carousel: React.FC<Props> = ({ items, color, prev, next }) => {
    const colorTheme = useContext(ColorThemeContext);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section className='carousel'>
            <button
                aria-label='previous'
                onClick={() => setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex <= 0}
                style={color ? { backgroundColor: colorTheme[color] } : undefined}
            >
                <div className='icon-container reverse'>
                    <ArrowIcon />
                </div>
            </button>
            {
                prev || next
                ? <MultipleItems items={items} currentIndex={currentIndex} prev={prev} next={next} />
                : <OneItem items={items} currentIndex={currentIndex} />
            }
            <button
                aria-label='next'
                onClick={() => setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex >= items.length - 1}
                style={color ? { backgroundColor: colorTheme[color] } : undefined}
            >
                <div className='icon-container'>
                    <ArrowIcon />
                </div>
            </button>
        </section>
    );
}

export default Carousel;