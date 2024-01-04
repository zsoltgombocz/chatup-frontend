import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useAudio } from '@hooks/useAudio';

import AppLayout from '@layout/AppLayout';
import LazyLoad from '@layout/LazyLoad';
import { useUserSettings } from '@store/userSettings';
import { setTheme } from '@utils/theme';
import { connectToSocket, socket } from './socket';
import { useSocketStore } from '@store/socketStore';
import { SearchState, ToastVariant, UserStatus } from '@utils/enums';
import NotFound from '@views/NotFound';
import { useUserData } from './store/userData';
import { useNotify } from './hooks/useNotify';
import { ROUTES } from './config/linkedRoutes';



const Application = () => {

    const location = useLocation();

    const theme = useUserSettings(state => state.theme);

    const { initAudio } = useAudio(['navigate.wav']);

    const setRoomId = useUserData(state => state.setRoomId);
    const setToken = useUserData(state => state.setToken);
    const setSearch = useUserData(state => state.setSearch);

    const { connected, setConnected, setConnectedUsers, setQueuePopulation, setMessages, setPartnerStatus } = useSocketStore();

    const { notify } = useNotify();

    useEffect(() => {
        setTheme(theme);
        initAudio();
        connectToSocket();
        socket.io.on("error", (error) => {
            console.log(error);
        });
        setSearch(SearchState.ACTIVE);

        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));
        socket.on('userNumberChanged', (num) => setConnectedUsers(num));
        socket.on('queuePopulation', (num) => setQueuePopulation(num));
        socket.on('userAuthDone', ({ token, roomId }) => {
            setToken(token);
            setRoomId(roomId.last || undefined);
        });
        socket.on('userRoomIdChanged', (id) => {
            console.log('user room changed', id)
            setRoomId(id);
        });
        socket.on('partnerStatusChange', (status) => {
            console.log('partner status changed to', status);

            setPartnerStatus(status <= 1 ? UserStatus.DISCONNECTED : UserStatus.ONLINE)
        });
        socket.on('partnerLeavedChat', () => {
            console.log('partner leaved');

            setPartnerStatus(UserStatus.DISCONNECTED);
        });
        socket.on('partnerJoinedChat', () => {
            console.log('partner joined');
            setPartnerStatus(UserStatus.ONLINE);
        });
        socket.on('roomDestroyed', () => {
            console.log('room destroyed');
            notify('Szoba megszűnt!', 'A szoba amiben tartózkodtál törlésre került mert partnered kilépett vagy túl régóta inaktív.', ToastVariant.DEFAULT, 5000);
        });

        socket.on('updatedMessages', (messages) => {
            setMessages(messages);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('userNumberChanged');
            socket.disconnect();
        }
    }, []);

    return (
        <Routes>

            <Route path="/" element={<AppLayout disableLayout={location.pathname === '/'} />}>
                {
                    ROUTES.map(route =>
                        <Route path={route.route} element={<LazyLoad>{route.view}</LazyLoad>} />
                    )
                }
                <Route path={'*'} element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default Application;
