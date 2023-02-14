import React, { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import AppLayout from './layout/AppLayout';
import LazyLoad from './layout/LazyLoad';
import { useUserSettings } from './store/userSettings';
import { setTheme } from './utils/theme';
import Search from './views/Search';

const HomeView = lazy(() => import('./views/HomeView'));
const SettingsView = lazy(() => import('./views/SettingsView'));
const Privacy = lazy(() => import('./views/settings/Privacy'));
const Customize = lazy(() => import('./views/settings/Customize'));
const Information = lazy(() => import('./views/settings/Information'));
const Help = lazy(() => import('./views/settings/Help'));
const Contact = lazy(() => import('./views/settings/Contact'));
const DevlogView = lazy(() => import('./views/DevlogView'));
const CountySelectionView = lazy(() => import('./views/pre/CountySelectionView'));
const GenderSelectionView = lazy(() => import('./views/pre/GenderSelectionView'));
const InterestSelectionView = lazy(() => import('./views/pre/InterestSelectionView'));


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
                <Route index element={<LazyLoad><HomeView /></LazyLoad>} />
                <Route path={'devlog'} element={<LazyLoad><DevlogView /></LazyLoad>} />
                <Route path="settings">
                    <Route index element={<LazyLoad><SettingsView /></LazyLoad>} />
                    <Route path={'privacy'} element={<LazyLoad><Privacy /></LazyLoad>} />
                    <Route path={'customize'} element={<LazyLoad><Customize /></LazyLoad>} />
                    <Route path={'information'} element={<LazyLoad><Information /></LazyLoad>} />
                    <Route path={'help'} element={<LazyLoad><Help /></LazyLoad>} />
                    <Route path={'contact'} element={<LazyLoad><Contact /></LazyLoad>} />
                </Route>
                <Route path={'pre'}>
                    <Route index element={<LazyLoad><CountySelectionView /></LazyLoad>} />
                    <Route path={'location'} element={<LazyLoad><CountySelectionView /></LazyLoad>} />
                    <Route path={'gender'} element={<LazyLoad><GenderSelectionView /></LazyLoad>} />
                    <Route path={'interest'} element={<LazyLoad><InterestSelectionView /></LazyLoad>} />
                </Route>
                <Route path={'search'} element={<LazyLoad><Search /></LazyLoad>} />
            </Route>
        </Routes>
    );
};

export default Application;
