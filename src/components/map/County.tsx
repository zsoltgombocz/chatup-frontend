import React, { useEffect, useState } from 'react'
import { useUserSettings } from '../../store/userSettings';
import { motion as m } from 'framer-motion';

type Props = {
    path: string,
    id: string,
    onCountyClicked: Function | undefined,
    selected: boolean,
    disabled: boolean,
}

function County({ path, id, onCountyClicked, selected, disabled }: Props) {
    const [countyState, setCountyState] = useState(selected);
    const userColor = useUserSettings(state => state.color);

    useEffect(() => {
        setCountyState(selected);
    }, [selected])

    return (
        <m.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => {
                if (disabled) return;

                const state = !countyState;
                onCountyClicked?.(id, state);
                setCountyState(state);
            }}
            className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} county stroke-bg-dark-outer dark:stroke-bg-light-outer stroke-1 ${countyState ? 'fill-' + userColor : 'fill-bg-light-inner dark:fill-bg-dark-inner'}`}
            d={path} id={id}>
        </m.path >
    )
}

export default County