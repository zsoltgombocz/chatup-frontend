import React, { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { AnimatePresence, motion as m } from 'framer-motion';

type Props = {
    path: string,
    id: string,
}

function County({ path, id }: Props) {
    const [selected, setSelected] = useState(false);
    const userColor = useUserSettings(state => state.color);
    useEffect(() => {
        console.log(selected);
    }, [selected])

    return (
        <m.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setSelected(!selected)}
            className={`cursor-pointer county stroke-bg-dark-outer dark:stroke-bg-light-outer stroke-1 ${selected ? 'fill-' + userColor : 'fill-bg-light-inner dark:fill-bg-dark-inner'}`}
            d={path} id={id}>
        </m.path >
    )
}

export default County