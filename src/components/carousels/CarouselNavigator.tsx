import { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { motion as m } from 'framer-motion';
import classNames from 'classnames';

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

    const dotContainerClasses = classNames(
        'flex gap-2 justify-center',
        { ['flex-row w-full']: variant === NavigatorVariant.HORIZONTAL },
        { ['flex-col h-full']: variant === NavigatorVariant.VERTICAL },
        className
    );

    const dotClasses = classNames(
        'rounded-full h-2 w-2 relative',
    );

    const getDotStyle = (dot: boolean) => dot ? (`${variant === 0 ? 'w-4' : 'h-4'} bg-${userColor}`) : (`${variant === 0 ? 'w-2' : 'h-2'} bg-white`)

    return (
        <m.div layout layoutRoot className={dotContainerClasses}>
            {dots.map((dot, i) => <m.div key={i} className={`${dotClasses} ${getDotStyle(dot)}`} layout />)}
        </m.div>
    )
}

export default CarouselNavigator