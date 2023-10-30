import { ReactNode, useEffect, useRef, useState } from 'react';

import './parallax.scss';

interface Props {
    children: ReactNode,
    backgroundPath: string,
    speed: number,
    backgroundStyle?: React.CSSProperties
}

const Parallax: React.FC<Props> = ({ backgroundPath, children, speed, backgroundStyle }) => {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    const [backgroundTranslateY, setBackgroundTranslateY] = useState(0);
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);

    useEffect(() => {
        function onScroll(e: Event) {
            const inView = isInView();

            if (inView) updateBackground();
        }
        
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // calculates how much larger to make background and whether to offset background above or below Parallax
    useEffect(() => {
        if (parallaxRef.current) {
            const { height } = parallaxRef.current.getBoundingClientRect();

            const translateTotal = height * speed;

            if (speed >= 0) {
                setTop(-translateTotal);
                setBottom(0);
            } else {
                setTop(0);
                setBottom(translateTotal);
            }
        }
    }, [parallaxRef.current, speed]);

    const isInView = () => {
        if (parallaxRef.current) {
            const scrollPosition = window.scrollY;
    
            const windowHeight = window.innerHeight;
        
            const parallaxCoordinates = parallaxRef.current.getBoundingClientRect();
            const parallaxWindowTop = parallaxCoordinates.top + scrollY - windowHeight;
            const parallaxWindowBottom = parallaxCoordinates.bottom + scrollY;
    
            return scrollPosition <= parallaxWindowBottom && scrollPosition >= parallaxWindowTop;
        }
    }

    const updateBackground = () => {
        if (parallaxRef.current) {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const {
                height: parallaxHeight,
                top: parallaxTop
            } = parallaxRef.current.getBoundingClientRect();

            // parallaxWindowTop includes the window height surrounding Parallax
            // This way, parallaxWindowTop === scrollPosition when Parallax enters from the bottom of the screen 
            const parallaxWindowTop = parallaxTop + scrollY - windowHeight;

            const translateTotal = parallaxHeight * speed;
            
            // relative to parallaxWindowTop
            const scrollPositionRelative = scrollPosition - parallaxWindowTop;

            // if scrollPositionRelative is positive we are somewhere below parallaxWindowTop. Negative would be above.
            const percentThroughParallaxWindow = scrollPositionRelative / (parallaxHeight + windowHeight);

            const translateY = translateTotal * percentThroughParallaxWindow;
            
            setBackgroundTranslateY(translateY);
        }
    }

    return (
        <div ref={parallaxRef} className='parallax'>
            <div
                ref={backgroundRef}
                className='background'
                style={{
                    backgroundImage: `url(${backgroundPath})`,
                    top: `${top}px`,
                    bottom: `${bottom}px`,
                    transform: `translateY(${backgroundTranslateY}px)`,
                    ...backgroundStyle
                }}
            ></div>
            <div className='children-container'>
                { children }
            </div>
        </div>
    );
}

export default Parallax;