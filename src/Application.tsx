import React from 'react';
import HomeView from './views/HomeView';
import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from './layout/AppLayout';
import SettingsView from './views/SettingsView';

const Application = () => {

    const location = useLocation();

    return (
        <Routes>
            <Route path="/" element={<AppLayout disableLayout={location.pathname === '/'} />}>
                <Route index element={<HomeView />} />
                <Route path="settings" element={<SettingsView />} />
            </Route>

            <Route path="*" element={<div>not found</div>} />
        </Routes>
    );
};

export default Application;
