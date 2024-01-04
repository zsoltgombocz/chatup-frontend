import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
import { useUserSettings } from '@store/userSettings';
import { motion as m } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

type Props = {
    options: string[],
    name: string,
    className?: string,
    selectedIndex?: number | undefined,
    onChange?: Function | undefined,
}

const SelectInput = ({ options, name, className, selectedIndex, onChange }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        onChange?.();
    }
    return (
        <div className={className}>
            <select name={name} id={name} defaultValue={options[0]} onChange={handleChange} className={'select-input'}>
                {
                    options.map((option, index) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </div >
    )
}

export default SelectInput