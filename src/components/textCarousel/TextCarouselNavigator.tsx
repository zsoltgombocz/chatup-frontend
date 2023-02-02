import React, { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { motion as m } from 'framer-motion';


type Props = {
    max: number,
    className?: string,
    activeIndex: number,
}
const TextCarouselNavigator = ({ max, className, activeIndex }: Props) => {
    const [dots, setDots] = useState<boolean[]>([]);

    const userColor = useUserSettings(state => state.color);

    useEffect(() => {
        const dotArray = new Array(max).fill(false);
        dotArray[activeIndex || 0] = true;
        setDots(dotArray);
    }, [activeIndex]);

    return (
        <m.div className={'w-full flex flex-row gap-2 justify-center ' + className}>
            {dots.map((dot, i) => <m.div key={i} className={`h-2 bg-white rounded-full ${dot ? ('w-4 bg-' + userColor) : 'w-2'}`} layout />)}
        </m.div>
    )
}

export default TextCarouselNavigator