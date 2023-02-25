import React, { useState } from 'react'
import { motion as m } from 'framer-motion';
import { useUserSettings } from '../../../store/userSettings';
import { useInterestPreferences } from '../../../store/interestPreferences';

type Props = {
    id: string,
    src: string | undefined,
    display: string,
    defaultSelected?: boolean,
    onClick?: undefined | Function,
    disabled?: boolean
}

const Interest = ({ id, src, display, defaultSelected = false, disabled = false }: Props) => {
    const [selected, setSelected] = useState(defaultSelected);
    const userColor = useUserSettings(state => state.color);
    const updateInterests = useInterestPreferences(state => state.updateInterests);
    const onInterestClick = () => {
        if (disabled) return;

        setSelected(!selected);
        updateInterests(id, !selected);
    }

    return (
        <div className={'flex flex-col p-1 w-32 h-40 items-evenly justify-evenly select-none'} >
            <div className={'relative flex items-center justify-center'}>
                <img
                    loading={'lazy'}
                    src={src}
                    className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} interest border-color-blue z-50 ${selected ? 'saturate-100' : 'saturate-0'}`}
                    onClick={onInterestClick}
                />
                <m.div initial={{ opacity: 0 }} animate={selected ? { opacity: 1 } : { opacity: 0 }} className={`bg-${userColor} absolute z-0 rounded-full w-[116px] h-[116px]`} />
            </div>
            <span className={'text text-base text-center'}>{display}</span>
        </div>
    )
}

export default Interest