import { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useAudio } from '@hooks/useAudio';

import AppLayout from '@layout/AppLayout';
import LazyLoad from '@layout/LazyLoad';
import { useUserSettings } from '@store/userSettings';
import { setTheme } from '@utils/theme';
import { socket } from './socket';
import { useSocketStore } from '@store/socketStore';

const HomeView = lazy(() => import('@views/HomeView'));
const SettingsView = lazy(() => import('@views/SettingsView'));
const Privacy = lazy(() => import('@views/settings/Privacy'));
const Customize = lazy(() => import('@views/settings/Customize'));
const Information = lazy(() => import('@views/settings/Information'));
const Help = lazy(() => import('@views/settings/Help'));
const Contact = lazy(() => import('@views/settings/Contact'));
const DevlogView = lazy(() => import('@views/DevlogView'));
const CountySelectionView = lazy(() => import('@views/pre/CountySelectionView'));
const GenderSelectionView = lazy(() => import('@views/pre/GenderSelectionView'));
const InterestSelectionView = lazy(() => import('@views/pre/InterestSelectionView'));
const SearchView = lazy(() => import('@views/SearchView'));
const ChatView = lazy(() => import('@views/ChatView'));

const Application = () => {

    const location = useLocation();

    const theme = useUserSettings(state => state.theme);

    const { initAudio } = useAudio(['navigate.wav']);

    const { setConnected, setConnectedUsers, setQueuePopulation, setRoom } = useSocketStore();

    useEffect(() => {
        setTheme(theme);
        initAudio();

        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => console.log('disconnect'));
        socket.on('userNumberChanged', (num) => setConnectedUsers(num));
        socket.on('queuePopulation', (num) => setQueuePopulation(num));
        socket.on('userAuthDone', (token) => sessionStorage.setItem('chatup_socket_token', token));
        socket.on('roomChanged', (id) => setRoom(id));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('userNumberChanged');
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
                <Route path={'search'} element={<LazyLoad><SearchView /></LazyLoad>} />
                <Route path={'chat'} element={<LazyLoad><ChatView /></LazyLoad>} />
            </Route>
        </Routes>
    );
};

export default Application;
