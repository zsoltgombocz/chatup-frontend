import React, { SyntheticEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { motion as m } from 'framer-motion';
import { useUserSettings } from '../store/userSettings';

type Props = {
    onStateChanged: (state: boolean) => void,
    checked?: boolean,
}

function ToggleSwitch({ onStateChanged, checked = false }: Props) {
    const id = uuidv4();
    const [state, setState] = useState(checked);
    const userColor = useUserSettings(state => state.color)

    const handleSwitchClicked = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        setState(target.checked);
        onStateChanged?.(target.checked);
    }
    return (
        <div className={'flex flex-wrap'}>
            <input
                type="checkbox"
                className="hidden"
                name={id}
                id={id}
                defaultChecked={state}
                onChange={handleSwitchClicked}
            />
            <label className={'switch-base border-bg-dark-inner dark:border-bg-light-inner bg-bg-dark-outer dark:bg-bg-light-outer'} htmlFor={id}>
                <m.div className={`switch-circle top-[0.16rem] ${state ? 'bg-' + userColor : 'bg-white dark:bg-gray-600'}`}
                    animate={{ left: `calc(1.75rem * ${state ? 1 : 0})` }}>

                </m.div>
            </label>
        </div>
    )
}

export default ToggleSwitch