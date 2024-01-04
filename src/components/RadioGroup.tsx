import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, SyntheticEvent } from 'react'
import { useUserSettings } from '@store/userSettings';
import { motion as m } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

type Props = {
    options: string[],
    name: string,
    className?: string,
    radioGap?: number,
    variant?: 'circle' | 'box',
    selectedIndex?: number | undefined,
    onChange?: Function | undefined,
    textClass?: string,
}

interface RadioInterface {
    id: string,
    display: string,
    state: boolean,
    name: string,
}

const RadioGroup = ({ options, name, className, radioGap = 1, variant = 'circle', selectedIndex = undefined, onChange, textClass = 'text-lg' }: Props) => {
    const [radios, setRadios] = useState<RadioInterface[]>([]);

    const userColor = useUserSettings(state => state.color);

    const gap = 'mb-' + radioGap;

    useEffect(() => {
        setRadios([]);
        options.map((opt, i) => {
            const radio: RadioInterface = {
                id: name + i,
                display: opt,
                state: selectedIndex !== undefined && selectedIndex === i ? true : false,
                name
            };

            setRadios(prev => [...prev, radio]);
        });
    }, [options]);

    const handleRadioClicked = (e: SyntheticEvent<HTMLInputElement>, id: string) => {
        const newArr: RadioInterface[] = radios.map(radio => {
            if (radio.id === id) {
                radio.state = true;
            } else radio.state = false;
            return radio;
        });

        setRadios(newArr);
        onChange?.(e);
    }

    return (
        <div className={className}>
            {radios.map((radio, index) => (
                <div className={gap} key={radio.id}>
                    <input type="radio" id={radio.id} name={radio.name} value={index} className={'hidden'} onChange={(e) => handleRadioClicked(e, radio.id)} />
                    <label htmlFor={radio.id} className={`text ${textClass} font-light flex flex-row items-center gap-2`}>
                        <div className={`w-5 h-5 flex items-center justify-center ${variant === 'circle' ? 'rounded-full' : ''} ${variant === 'box' ? 'rounded-md' : ''} border ${(variant === 'box' && radio.state) ? 'border-color-' + userColor : 'border-bg-dark-inner dark:border-bg-light-inner'} relative`}>
                            {variant === 'circle' &&
                                (<AnimatePresence>
                                    <m.div initial={{ scale: 0 }} animate={{ scale: radio.state ? 1 : 0 }} className={`w-2 h-2 absolute bg-${userColor} rounded-full`} />
                                </AnimatePresence>)
                            }
                            {variant === 'box' &&
                                (<AnimatePresence>
                                    <m.div initial={{ scale: 0 }} animate={{ scale: radio.state ? 1 : 0 }} className={`w-full h-full absolute bg-${userColor} rounded-md top-0 left-0 flex items-center justify-center`}>
                                        <CheckIcon className={'w-5 h-5 text-white '} />
                                    </m.div>
                                </AnimatePresence>)
                            }
                        </div>{radio.display}
                    </label>
                </div >
            ))}
        </div >
    )
}

export default RadioGroup