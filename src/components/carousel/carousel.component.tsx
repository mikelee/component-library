import React, { useContext, useLayoutEffect, useState } from 'react';
import { ColorThemeContext } from '../color-theme/color-theme.component';

import './carousel.styles.scss';
import { ReactComponent as ArrowIcon} from '../../assets/arrow_right.svg';

interface Props {
    items: any[],
    color?: string,
    prev?: boolean,
    next?: boolean
}

const Carousel: React.FC<Props> = ({ items, color, prev, next }) => {
    const colorTheme = useContext(ColorThemeContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    useLayoutEffect(() => {
        const width = document?.getElementById('item-cur')?.offsetWidth;
        
        if (width) setItemWidth(width);
    }, [items]);

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
                    prev
                    ?
                        <div className='item item-prev'>
                            {
                                currentIndex - 1 >= 0
                                ? items[currentIndex - 1]
                                : <div style={{ width: itemWidth }} data-testid='prev-placeholder'></div>
                            }
                        </div>
                    : null
                }
            <div id='item-cur' className='item'>
                {items[currentIndex]}
            </div>
            {
                next
                ?
                    <div className='item item-next'>
                        {
                            currentIndex + 1 <= items.length - 1
                            ? items[currentIndex + 1]
                            : <div style={{ width: itemWidth }} data-testid='next-placeholder'></div>
                        }
                    </div>
                : null
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