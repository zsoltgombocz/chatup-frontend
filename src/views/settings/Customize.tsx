import React from 'react'
import { motion as m } from 'framer-motion';
import Switch from '../../components/settings/Switch';
import { config } from '../../config/settingsConfig';
import { setTheme } from '../../utils/theme';
import { useUserSettings } from '../../store/userSettings';

const Customize = () => {
    const switchOptions = config.themes;
    const updateTheme = useUserSettings(state => state.setTheme);
    const theme = useUserSettings(state => state.theme);

    const handleThemeChange = (index: number) => {
        updateTheme(index);
        setTheme(index);
    }
    return (
        <>
            <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
                <h5 className={'text text-xl mb-3'}>Téma választása</h5>
                <Switch options={switchOptions} onChange={handleThemeChange} className={'mb-3 self-center'} initialSelectedIndex={theme} />
                <h5 className={'text text-xl mb-3'}>Téma színének választása</h5>
            </m.div>
        </>);
}

export default Customize