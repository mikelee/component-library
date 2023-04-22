import { useLayoutEffect, useState } from 'react';
import { Flipped, Flipper, spring } from 'react-flip-toolkit';

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

    const onElementAppear = (el: any) => spring({
        onUpdate: val => {
            el.style.opacity = val
        },
        delay: 100
    });

    return (
        <Flipper flipKey={currentIndex}>
            <div className='item-group'>
                {
                    prev
                    ?
                        <Flipped
                            key={currentIndex - 1}
                            flipId={currentIndex - 1}
                            transformOrigin='50% 50%'
                            onAppear={onElementAppear}
                        >
                            <div className='item item-prev'>
                                {
                                    currentIndex - 1 >= 0
                                    ? items[currentIndex - 1]
                                    : <div style={{ width: itemWidth }} data-testid='prev-placeholder'></div>
                                }
                            </div>
                        </Flipped>
                    : null
                }
                <Flipped
                    key={currentIndex}
                    flipId={currentIndex}
                >
                    <div id='item-cur' className='item'>
                        {items[currentIndex]}
                    </div>
                </Flipped>
                {
                    next
                    ?
                        <Flipped
                            key={currentIndex + 1}
                            flipId={currentIndex + 1}
                            transformOrigin='50% 50%'
                            onAppear={onElementAppear}
                        >
                            <div className='item item-next'>
                                {
                                    currentIndex + 1 <= items.length - 1
                                    ? items[currentIndex + 1]
                                    : <div style={{ width: itemWidth }} data-testid='next-placeholder'></div>
                                }
                            </div>
                        </Flipped>
                    : null
                }
            </div>
        </Flipper>
    );
};

export default MultipleItems;