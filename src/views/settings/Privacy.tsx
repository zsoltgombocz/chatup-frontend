import { motion as m } from 'framer-motion';
import ToggleSwitch from '@components/ToggleSwitch';
import { useUserSettings } from '@store/userSettings';
import { config } from '@config/settingsConfig';

const Privacy = () => {
    const setPrivacy = useUserSettings(state => state.setPrivacy);
    const privacy = useUserSettings(state => state.privacy);
    const interactionSwitches = config.privacySwitches.slice(0, 1);
    const activitySwitches = config.privacySwitches.slice(2, 4);
    const dataSwitches = config.privacySwitches.slice(5, 6);
    return (
        <>
            <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
                <h5 className={'text text-lg mb-1'}>Nemkívánatos interakciók</h5>
                <p className={'text mb-6 font-extralight text-justify'}>
                    Kikapcsolható azon interakciók lehetősége,
                    melyek megjelenítése nem kívánatos a felhasználó számára.
                </p>

                {interactionSwitches.map((sw) => (
                    <div className={'flex flex-row justify-between items-center mb-2'}>
                        <h5 className={'text text-lg'}>{sw.text}</h5>
                        <ToggleSwitch onStateChanged={(state) => setPrivacy(sw.index, state)} checked={privacy[sw.index]} />
                    </div>
                ))}

                {activitySwitches.map((sw) => (
                    <div className={'flex flex-row justify-between items-center mb-2'}>
                        <h5 className={'text text-lg'}>{sw.text}</h5>
                        <ToggleSwitch onStateChanged={(state) => setPrivacy(sw.index, state)} checked={privacy[sw.index]} />
                    </div>
                ))}
                {false && <>
                    <h5 className={'text text-lg mb-1 mt-8'}>Adatokra vonatkozó jogosultságok</h5>
                    <p className={'text mb-6 font-extralight text-justify'}>
                        A felhasználó dönthet afelől, hogy a visszajelzés céljából gyűjtött adatokat az oldal készítőjének eljutattja.
                        Az adatok továbbítása kizárólagosan a teljesítményre vonatkoznak,
                        a felhasználók kiléte továbbra is anonim marad.
                    </p>

                    {dataSwitches.map((sw) => (
                        <div className={'flex flex-row justify-between items-center mb-2'}>
                            <h5 className={'text text-lg'}>{sw.text}</h5>
                            <ToggleSwitch onStateChanged={(state) => setPrivacy(sw.index, state)} checked={privacy[sw.index]} />
                        </div>
                    ))}
                </>}
            </m.div>
        </>)
}

export default Privacy