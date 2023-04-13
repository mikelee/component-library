import React, { useState } from 'react';

import './carousel.styles.scss';

interface Props {
    items: any[]
}

const Carousel: React.FC<Props> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section className='carousel'>
            <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex <= 0}
                >Previous</button>
            <div className='item'>
                {items[currentIndex]}
            </div>
            <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex >= items.length - 1}
            >Next</button>
        </section>
    );
}

export default Carousel;