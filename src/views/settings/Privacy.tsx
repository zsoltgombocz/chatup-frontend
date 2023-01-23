import React from 'react'
import { motion as m } from 'framer-motion';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useUserSettings } from '../../store/userSettings';

const Privacy = () => {
    const setPrivacy = useUserSettings(state => state.setPrivacy);
    const privacy = useUserSettings(state => state.privacy);
    return (
        <>
            <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
                <h5 className={'text text-lg mb-1'}>Nemkívánatos interakciók</h5>
                <p className={'text mb-6 font-extralight text-justify'}>
                    Kikapcsolható azon interakciók lehetősége,
                    melyek megjelenítése nem kívánatos a felhasználó számára.
                </p>

                <div className={'flex flex-row justify-between items-center mb-2'}>
                    <h5 className={'text text-lg'}>Linkek küldése</h5>
                    <ToggleSwitch onStateChanged={(state) => setPrivacy(0, state)} checked={privacy[0]} />
                </div>
                <div className={'flex flex-row justify-between items-center mb-10'}>
                    <h5 className={'text text-lg'}>Képek / Videók küldése</h5>
                    <ToggleSwitch onStateChanged={(state) => setPrivacy(1, state)} checked={privacy[1]} />
                </div>

                <h5 className={'text text-lg mb-1'}>Aktivitási állapot megjelenítése</h5>
                <p className={'text mb-6 font-extralight text-justify'}>
                    A felhasználó által módosítható a partner által látható élő,
                    aktivitást jelző állapotindikátorok.
                </p>

                <div className={'flex flex-row justify-between items-center mb-2'}>
                    <h5 className={'text text-lg'}>Elérhetőség jelzése (AFK)</h5>
                    <ToggleSwitch onStateChanged={(state) => setPrivacy(2, state)} checked={privacy[2]} />
                </div>
                <div className={'flex flex-row justify-between items-center mb-10'}>
                    <h5 className={'text text-lg'}>Live-feedback követése</h5>
                    <ToggleSwitch onStateChanged={(state) => setPrivacy(3, state)} checked={privacy[3]} />
                </div>

                <h5 className={'text text-lg mb-1'}>Adatokra vonatkozó jogosultságok</h5>
                <p className={'text mb-6 font-extralight text-justify'}>
                    A felhasználó dönthet afelől, hogy a visszajelzés céljából gyűjtött adatokat az oldal készítőjének eljutattja.
                    Az adatok továbbítása kizárólagosan a teljesítményre vonatkoznak,
                    a felhasználók kiléte továbbra is anonim marad.
                </p>

                <div className={'flex flex-row justify-between items-center mb-6'}>
                    <h5 className={'text text-lg'}>Felhasználói adatok gyűjtése</h5>
                    <ToggleSwitch onStateChanged={(state) => setPrivacy(4, state)} checked={privacy[4]} />
                </div>
            </m.div>
        </>)
}

export default Privacy