import { motion as m } from 'framer-motion';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Button from '@components/Button';
import Footer from '@layout/Footer';
import { useUserData } from '@store/userData';
import { SearchState } from '@utils/enums';

import DarkPatternedBackground from '@media/images/pattern_randomized_dark.png';
import LightPatternedBackground from '@media/images/pattern_randomized_light.png';
import { useUserSettings } from '@store/userSettings';
import { useEffect } from 'react';
import { socket } from '@/socket';
import { useSocketStore } from '@store/socketStore';
import { useGenderPreferebces } from '@store/genderPreferences';
import { useMapPreferences } from '@store/mapPreferences';
import { useInterestPreferences } from '@store/interestPreferences';
import LoadingIcon from '@/atoms/LoadingIcon';
import { useNavigateBack } from '@/hooks/useNavigateBack';


const SearchView = () => {
    const searchType = useUserData(state => state.searchType);
    //const allPrePageVisited = prePagesVisited(Object.keys(prePageSteps));
    const { setRoomId, roomId } = useUserData();

    useEffect(() => {
        setRoomId(undefined);
        socket.emit('roomLeaved');
    }, []);

    const renderPage = () => {
        if (roomId !== undefined) return <></>;

        if (searchType === SearchState.ACTIVE) {
            return <ActiveSearch />
        } else {
            return <ReSearch />
        }
    }

    return renderPage();
}

const ActiveSearch = () => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigateBack();

    const { theme } = useUserSettings();
    const BG = theme === 0 ? LightPatternedBackground : DarkPatternedBackground;
    const { roomId, setSearch, setRoomId } = useUserData();

    const { queuePopulation } = useSocketStore();

    const userLocation = useUserData(state => state.location);
    const everyPrePageVisited = useUserData(state => state.everyPrePageVisited);
    const userColor = useUserSettings(state => state.color);
    const genderPref = useGenderPreferebces();
    const mapPref = useMapPreferences();
    const interests = useInterestPreferences(state => state.interests);

    useEffect(() => {
        setRoomId(undefined);
        setTimeout(() => {
            socket.emit('startSearch', {
                location: userLocation,
                ownGender: genderPref.ownGender,
                partnerGender: genderPref.partnerGender,
                counties: mapPref.counties,
                mapPref: mapPref.mapCheckbox,
                interests: interests,
                valid: everyPrePageVisited()
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (roomId != null) {
            setSearch(SearchState.RE_SEARCH);
            navigate('/chat', { replace: true });
        }
    }, [roomId]);

    return everyPrePageVisited() ? (
        <>
            <img src={BG} className={'object-none h-full w-full absolute top-0 left-0 z-0'} />
            <m.div className={`view !pt-1 z-10 justify-center items-center`} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'w-24 h-24'}>
                    <LoadingIcon size={13} />
                </div>
                <h1 className={'text text-2xl'}>Partner keresése...</h1>
                <h1 className={'text text-base'}>Jelenleg <span className={`text-${userColor}`}>{queuePopulation}</span> felhasználó áll sorban.</h1>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'mégse'} className={'mb-3'} onClick={() => navigateBack()} />
            </Footer>
        </>
    ) : <Navigate to="/" replace />
}

const ReSearch = () => {
    const { theme } = useUserSettings();
    const BG = theme === 0 ? LightPatternedBackground : DarkPatternedBackground;
    const setSearch = useUserData(state => state.setSearch);
    const setRoomId = useUserData(state => state.setRoomId);
    const navigate = useNavigate();

    const onReSearchButtonClicked = () => {
        setSearch(SearchState.ACTIVE);
        setRoomId(undefined);
        navigate('/search', { replace: true });
    }

    return (
        <>
            <img src={BG} className={'object-none h-full w-full absolute top-0 left-0 z-0'} />
            <m.div className={'view !pt-1 z-10'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>

            </m.div>
            <Footer showVersion={false}>
                <p className={'text text-xl text-center mt-1 max-w-[400px]'}>
                    <span className={'font-bold'}>Élvezd</span> ki az anonimitás által nyújtott szabadságot és beszélgess ismeretlenekkel
                </p>
                <p className={'text text-sm dark:text-[#dbdbdb] text-gray-300 mt-2 mb-3'}>
                    Beszélgess, ismerj meg új embereket!
                </p>
                <Button onClick={onReSearchButtonClicked} size={'primary'} style={'filled'} text={'új partner keresése'} className={'mb-3'} />
                <p onClick={() => navigate('/pre/interest')} className={'cursor-pointer mt-1 mb-4 text text-sm dark:text-[#dbdbdb] text-gray-300 underline underline-offset-1'}>
                    Szűrő módosítása
                </p>
            </Footer>
        </>
    )
}

export default SearchView