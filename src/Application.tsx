import React, { useEffect } from 'react';
import HomeView from './views/HomeView';
import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from './layout/AppLayout';
import SettingsView from './views/settings/SettingsView';
import { AnimatePresence } from 'framer-motion';
import Privacy from './views/settings/Privacy';
import Customize from './views/settings/Customize';
import Information from './views/settings/Information';
import Help from './views/settings/Help';
import Contact from './views/settings/Contact';

const Application = () => {

    const location = useLocation();

    useEffect(() => {
        console.log('app mount');

        return () => {
            console.log('app unmount')
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<AppLayout disableLayout={location.pathname === '/'} />}>
                <Route index element={<HomeView />} />
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
