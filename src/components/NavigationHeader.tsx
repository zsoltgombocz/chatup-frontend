import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useUserSettings } from '@store/userSettings';
import { useAudio } from '@hooks/useAudio';
import { config } from '@config/headerConfig';
import { getURLSegment } from '@utils/url';
import { useSocketStore } from '@/store/socketStore';
import { socket } from '@/socket';
import { getPreviousRoute, getRouteName } from '@/config/linkedRoutes';
import { useNavigateBack } from '@/hooks/useNavigateBack';

type Props = {
    hideRouteText: boolean
}

const socketEffectedRoutes = [
    'pre/interest',
    'pre/gender',
    'pre/location',
    'pre',
    'search',
    'chat'
];

const NavigationHeader = ({ hideRouteText = false }: Props) => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigateBack();
    const sounds = useUserSettings(state => state.sounds);
    const { play } = useAudio();

    const socketState = useSocketStore(state => state.connected);

    const segment: string = getURLSegment(location.pathname, null) || '';

    const handleBackClick = () => {
        if (sounds) play('navigate');

        if (!socketState && socketEffectedRoutes.includes(segment)) {
            navigate('/', { replace: true });
        } else {
            navigateBack();
        }
    }

    return (
        <div className={'flex flex-row items-center text text-2xl'}>
            <ChevronLeftIcon className="absolute left-10 h-7 w-7 cursor-pointer" onClick={handleBackClick} />
            {!hideRouteText ? <NavigationTitle /> : <div className={'opacity-0'}>ROUTE</div>}
        </div>
    )
}

const NavigationTitle = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const socketState = useSocketStore(state => state.connected);

    useEffect(() => {
        const segment: string = getURLSegment(location.pathname, null) || '';
        const routeName: string = getRouteName(location.pathname) || '';
        setTitle(routeName);

        if (!socketState && socketEffectedRoutes.includes(segment)) setTitle('HIBA!')
    }, [location, socketState]);

    return <>{title}</>;
}

export default NavigationHeader;