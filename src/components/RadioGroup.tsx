import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, SyntheticEvent } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUserSettings } from '../store/userSettings';
import { motion as m } from 'framer-motion';

type Props = {
    options: string[],
    name: string,
    className?: string,
    radioGap?: number
}

interface RadioInterface {
    id: string,
    display: string,
    state: boolean,
    name: string,
}

const RadioGroup = ({ options, name, className, radioGap = 1 }: Props) => {
    const [radios, setRadios] = useState<RadioInterface[]>([]);

    const userColor = useUserSettings(state => state.color);

    const gap = 'mb-' + radioGap;

    useEffect(() => {
        setRadios([]);
        options.map(opt => {
            const radio: RadioInterface = {
                id: uuidv4(),
                display: opt,
                state: false,
                name
            };

            setRadios(prev => [...prev, radio]);
        });
    }, [options]);

    const handleRadioClicked = (id: string) => {
        const newArr: RadioInterface[] = radios.map(radio => {
            if (radio.id === id) {
                radio.state = true;
            } else radio.state = false;
            return radio;
        })

        setRadios(newArr);
    }

    return (
        <div className={className}>
            {radios.map((radio, index) => (
                <div className={gap} key={radio.id}>
                    <input type="radio" id={radio.id} name={radio.name} value={index} className={'hidden'} onChange={() => handleRadioClicked(radio.id)} />
                    <label htmlFor={radio.id} className={'text text-lg font-light flex flex-row items-center gap-2'}>
                        <div className={'w-5 h-5 rounded-full border border-bg-dark-inner dark:border-bg-light-inner relative flex items-center justify-center'}>
                            <AnimatePresence>
                                <m.div animate={{ scale: radio.state ? 1 : 0 }} className={`w-2 h-2 absolute bg-${userColor} rounded-full`} />
                            </AnimatePresence>
                        </div>{radio.display}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioGroup