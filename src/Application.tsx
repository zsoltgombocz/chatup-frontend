import React, { useEffect } from 'react';
import HomeView from './views/HomeView';
import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from './layout/AppLayout';
import SettingsView from './views/SettingsView';
import Privacy from './views/settings/Privacy';
import Customize from './views/settings/Customize';
import Information from './views/settings/Information';
import Help from './views/settings/Help';
import Contact from './views/settings/Contact';
import { useUserSettings } from './store/userSettings';
import { setTheme } from './utils/theme';
import DevlogView from './views/DevlogView';

const Application = () => {

    const location = useLocation();

    const theme = useUserSettings(state => state.theme);

    useEffect(() => {
        setTheme(theme);

        return () => {
            console.log('app unmount')
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<AppLayout disableLayout={location.pathname === '/'} />}>
                <Route index element={<HomeView />} />
                <Route path={'devlog'} element={<DevlogView />} />
                <Route path="settings">
                    <Route index element={<SettingsView />} />
                    <Route path={'privacy'} element={<Privacy />} />
                    <Route path={'customize'} element={<Customize />} />
                    <Route path={'information'} element={<Information />} />
                    <Route path={'help'} element={<Help />} />
                    <Route path={'contact'} element={<Contact />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Application;
