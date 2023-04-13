import React, { useLayoutEffect, useState } from 'react';

import './carousel.styles.scss';

interface Props {
    items: any[],
    prev?: boolean
    next?: boolean
}

const Carousel: React.FC<Props> = ({ items, prev, next }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    useLayoutEffect(() => {
        const width = document?.getElementById('item-cur')?.offsetWidth;
        
        if (width) setItemWidth(width);
    }, [items]);

    return (
        <section className='carousel'>
            <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex <= 0}
                >Previous</button>
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
                onClick={() => setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex >= items.length - 1}
            >Next</button>
        </section>
    );
}

export default Carousel;