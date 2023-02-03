import React, { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion';
import { useUserSettings } from '../../../store/userSettings';

type Props = {
    src: string | undefined,
    display: string,
    defaultSelected?: boolean

}

const Interest = ({ src, display, defaultSelected = false }: Props) => {
    const [selected, setSelected] = useState(defaultSelected);
    const userColor = useUserSettings(state => state.color);

    useEffect(() => {
        console.log(display, selected)
    }, [selected])
    return (
        <div className={'flex flex-col p-1 w-32 h-40 items-evenly justify-evenly select-none'} >
            <div className={'relative flex items-center justify-center'}>
                <img
                    loading={'lazy'}
                    src={src}
                    className={`cursor-pointer interest border-color-blue z-50 ${selected ? 'saturate-100' : 'saturate-0'}`}
                    onClick={() => setSelected(!selected)}
                />
                <m.div initial={{ opacity: 0 }} animate={selected ? { opacity: 1 } : { opacity: 0 }} className={`bg-${userColor} absolute z-0 rounded-full w-[114px] h-[114px]`} />
            </div>
            <span className={'text text-base text-center'}>{display}</span>
        </div>
    )
}

export default Interest