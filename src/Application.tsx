import React, { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import AppLayout from './layout/AppLayout';
import { useUserSettings } from './store/userSettings';
import { setTheme } from './utils/theme';

const HomeView = lazy(() => import('./views/HomeView'));
const SettingsView = lazy(() => import('./views/SettingsView'));
const Privacy = lazy(() => import('./views/settings/Privacy'));
const Customize = lazy(() => import('./views/settings/Customize'));
const Information = lazy(() => import('./views/settings/Information'));
const Help = lazy(() => import('./views/settings/Help'));
const Contact = lazy(() => import('./views/settings/Contact'));
const DevlogView = lazy(() => import('./views/DevlogView'));
const PreChatView = lazy(() => import('./views/PreChatView'));

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
                <Route path={'pre'} element={<PreChatView />} />
            </Route>
        </Routes>
    );
};

export default Application;
