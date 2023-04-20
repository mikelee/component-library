import { useLayoutEffect, useState } from 'react';

interface Props {
    items: any[],
    currentIndex: number,
    prev?: boolean,
    next?: boolean
}

const MultipleItems: React.FC<Props> = ({ items, currentIndex, prev, next }) => {
    const [itemWidth, setItemWidth] = useState(0);

    useLayoutEffect(() => {
        const width = document?.getElementById('item-cur')?.offsetWidth;
        
        if (width) setItemWidth(width);
    }, [items]);

    return (
        <>
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
        </>
    );
};

export default MultipleItems;