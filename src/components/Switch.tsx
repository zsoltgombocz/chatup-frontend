import React, { ReactNode, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion';
import { SwitchOptionInterface } from '../utils/interfaces/components/switch';


type Props = {
    options: SwitchOptionInterface[] | [],
    onChange?: Function | undefined,
    className?: string,
    initialSelectedIndex?: number,
}

function Switch({ options, onChange = undefined, className, initialSelectedIndex = 0 }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        selectOption(initialSelectedIndex);
    }, [options]);

    const selectOption = (index: number) => {
        if (index > options.length || index < 0) { return; }
        setSelectedIndex(index);

        onChange?.(index);
    }

    return (
        <div className={'border border-1  border-gray-600 flex flex-row rounded-full w-fit p-1 relative ' + className}>
            <m.div
                animate={{ left: `calc(6rem * ${selectedIndex})` }}
                className={'z-0 w-24 border-1 border border-gray-600 absolute h-[calc(100%_-_0.25rem)] rounded-full -top-[0.125rem] bg-white m-1'}></m.div>
            {
                options.map((opt, i) =>
                    <div key={i + '' + (opt.text || 'text')} className={'z-10 px-2 py-1 flex text-gray-600 rounded-full justify-center items-center gap-1 w-24 cursor-pointer'} onClick={() => selectOption(i)}>
                        <span>{opt.icon}</span>
                        {selectedIndex === i && opt.text ? <span className={"font-medium mr-1"}>{opt.text}</span> : <></>}
                    </div>
                )
            }
        </div>
    )
}

export default Switch