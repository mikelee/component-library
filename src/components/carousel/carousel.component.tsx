import React, { useContext, useState } from 'react';
import { ColorThemeContext } from '../color-theme/color-theme.component';

import './carousel.styles.scss';
import ArrowIcon from '../../assets/arrow_right.svg';

import MultipleItems from './multiple-items.component';
import OneItem from './one-item.component';

interface Props {
    items: any[],
    color?: string,
    prev?: boolean,
    next?: boolean,
    itemPadding?: number
}

const Carousel: React.FC<Props> = ({ items, color, prev, next, itemPadding }) => {
    const colorTheme = useContext(ColorThemeContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection ] = useState<'left' | 'right'>('right');

    const clickPrev = () => {
        if (direction !== 'left') setDirection('left');
        setCurrentIndex(currentIndex - 1)
    }
    const clickNext = () => {
        if (direction !== 'right') setDirection('right');
        setCurrentIndex(currentIndex + 1)
    }

    return (
        <section className='carousel'>
            <button
                aria-label='previous'
                onClick={clickPrev}
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
                : <OneItem items={items} currentIndex={currentIndex} direction={direction} itemPadding={itemPadding} />
            }
            <button
                aria-label='next'
                onClick={clickNext}
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