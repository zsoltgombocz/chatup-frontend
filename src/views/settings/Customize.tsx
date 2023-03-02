import { motion as m } from 'framer-motion';
import Switch from '@components/Switch';
import { config } from '@config/settingsConfig';
import { setTheme } from '@utils/theme';
import { useUserSettings } from '@store/userSettings';
import ColorSwitcher from '@components/settings/ColorSwitcher';
import ToggleSwitch from '@components/ToggleSwitch';

const Customize = () => {
    const switchOptions = config.themes;
    const colorOptions = config.colors;
    const updateTheme = useUserSettings(state => state.setTheme);
    const setSoundState = useUserSettings(state => state.setSounds);
    const theme = useUserSettings(state => state.theme);
    const sounds = useUserSettings(state => state.sounds);

    const handleThemeChange = (index: number) => {
        updateTheme(index);
        setTheme(index);
    }

    return (
        <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
            <h5 className={'text text-xl mb-3'}>Téma választása</h5>
            <Switch options={switchOptions} onChange={handleThemeChange} className={'mb-3 self-center'} initialSelectedIndex={theme} />
            <h5 className={'text text-xl mt-5 mb-3'}>Téma színének választása</h5>
            <ColorSwitcher colors={colorOptions} />
            <div className={'flex align-middle justify-between'}>
                <h5 className={'text text-xl mt-5 mb-3'}>Hangok</h5>
                <ToggleSwitch onStateChanged={(state) => setSoundState(state)} checked={sounds} />
            </div>
        </m.div>
    );
}

export default Customize