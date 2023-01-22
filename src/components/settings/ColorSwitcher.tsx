import classes from 'classnames';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion as m } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useUserSettings } from '../../store/userSettings';

type Props = {
    colors: string[],
    onChange?: Function | undefined,
    className?: string,
    initialSelectedIndex?: number,
}

const ColorSwitcher = ({ colors }: Props) => {
    const [selectedColor, setSelectedColor] = useState('blue');
    const color = useUserSettings(state => state.color);
    const updateColor = useUserSettings(state => state.setColor);

    useEffect(() => {
        if (colors.length <= 0) return;

        setSelectedColor(color);

    }, [colors, color]);

    const selectColor = (color: string) => {
        setSelectedColor(color);
        updateColor(color);
    }

    return (
        <div className={'flex flex-row gap-5 items-center justify-center'}>{colors.map((color) => <ColorCircle key={color} color={color} selected={selectedColor === color} onClick={() => selectColor(color)} />)}</div>
    )
}

type ColorCircleProps = {
    color: string,
    selected?: boolean,
    onClick: Function | undefined,
}

const ColorCircle = ({ color, selected = false, onClick = undefined }: ColorCircleProps) => {
    const variants: { [id: string]: string } = {
        'red': 'color-circle red',
        'green': 'color-circle green',
        'blue': 'color-circle blue'
    }
    const classNames = classes(variants[color], selected && 'border');
    useEffect(() => {
        console.log(color, selected)
    }, [selected])

    return (<div className={'flex justify-center items-center relative'}>
        <AnimatePresence>
            {selected && <m.span className={'absolute z-10 top-[0.125rem]'} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <CheckCircleIcon className={'w-9 h-9 text-gray-100 dark:text-white'} />
            </m.span>
            }
        </AnimatePresence>

        <m.div
            onClick={() => onClick?.()}
            animate={selected ? { scale: 1.1 } : { scale: 1 }}
            whileHover={!selected ? { scale: 1.1 } : {}}
            className={classNames}></m.div>
    </div>);
}

export default ColorSwitcher