import React from 'react'
import { motion as m } from 'framer-motion';
import Footer from '../../layout/Footer';
import Switch from '../../components/Switch';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { setTheme } from '../../utils/theme';
import { useUserSettings } from '../../store/userSettings';

const Customize = () => {
    const switchOptions = [
        {
            icon: <SunIcon className={'w-7 h-7'} />,
            text: 'Világos'
        }, {
            icon: <MoonIcon className={'w-7 h-7'} />,
            text: 'Sötét'
        }
    ];
    const updateTheme = useUserSettings(state => state.setTheme);
    const handleThemeChange = (index: number) => {
        updateTheme(index);
        setTheme(index);
    }
    return (
        <>
            <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
                <h5 className={'text text-xl mb-3'}>Téma választása</h5>
                <Switch options={switchOptions} onChange={handleThemeChange} className={'mb-3 self-center'} />
            </m.div>
        </>);
}

export default Customize