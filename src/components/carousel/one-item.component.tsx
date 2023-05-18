import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {
    items: any[],
    currentIndex: number,
    direction: 'left' | 'right',
    itemPadding?: number
}

const OneItem: React.FC<Props> = ({ items, currentIndex, direction, itemPadding }) => {
    const [itemWidth, setItemWidth] = useState(0);
    const [itemHeight, setItemHeight] = useState(0);

    const itemRefs = useRef<RefObject<any>[]>(items.map(() => React.createRef()));

    useLayoutEffect(() => {
        const width = document?.getElementById('item-cur')?.offsetWidth;
        const height = document?.getElementById('item-cur')?.offsetHeight;
        
        if (width) setItemWidth(width);
        if (height) setItemHeight(height);
    }, [items]);

    const childFactory = (direction: 'left' | 'right') => (child: React.ReactElement) => {
        return React.cloneElement(child, {
            classNames: `from-${direction}`
        });
    }

    return (
        <TransitionGroup
            className='item-container'
            style={{ width: itemWidth, height: itemHeight, padding: itemPadding ? itemPadding : 0 }}
            childFactory={childFactory(direction)}
        >
            <CSSTransition key={currentIndex} timeout={300} nodeRef={itemRefs.current[currentIndex]} classNames={`from-${direction}`}>
                <div className='item one-item' ref={itemRefs.current[currentIndex]} style={{zIndex: 100 + currentIndex}}>
                    {items[currentIndex]}
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}
export default OneItem;