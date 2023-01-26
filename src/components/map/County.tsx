import React, { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { motion as m } from 'framer-motion';

type Props = {
    path: string,
    id: string,
    onCountyClicked: Function | undefined,
    selected: boolean
}

function County({ path, id, onCountyClicked, selected }: Props) {
    const [countyState, setCountyState] = useState(selected);
    const userColor = useUserSettings(state => state.color);

    return (
        <m.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => {
                const state = !countyState;
                onCountyClicked?.(id, state);
                setCountyState(state);
            }}
            className={`cursor-pointer county stroke-bg-dark-outer dark:stroke-bg-light-outer stroke-1 ${countyState ? 'fill-' + userColor : 'fill-bg-light-inner dark:fill-bg-dark-inner'}`}
            d={path} id={id}>
        </m.path >
    )
}

export default County