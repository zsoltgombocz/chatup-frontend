import { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { motion as m } from 'framer-motion';

export enum NavigatorVariant {
    HORIZONTAL, VERTICAL
}

type Props = {
    max: number,
    className?: string,
    activeIndex: number,
    variant?: NavigatorVariant
}
const CarouselNavigator = ({ max, className, activeIndex, variant = NavigatorVariant.HORIZONTAL }: Props) => {
    const [dots, setDots] = useState<boolean[]>([]);

    const userColor = useUserSettings(state => state.color);

    useEffect(() => {
        const dotArray = new Array(max).fill(false);
        dotArray[activeIndex || 0] = true;
        setDots(dotArray);
    }, [activeIndex, max]);

    return (
        <m.div className={`flex ${variant === 0 ? 'flex-row w-full' : 'flex-col h-full'} gap-2 justify-center ` + className}>
            {dots.map((dot, i) => <m.div key={i} className={`${variant === 0 ? 'h-2' : 'w-2'} bg-white rounded-full ${dot ? (`${variant === 0 ? 'w-4' : 'h-4'} bg-${userColor}`) : (variant === 0 ? 'w-2' : 'h-2')}`} layout />)}
        </m.div>
    )
}

export default CarouselNavigator