import { motion as m } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import Footer from '@layout/Footer';
import { useUserData } from '@store/userData';
import { SearchState } from '@utils/enums';

import DarkPatternedBackground from '@media/images/pattern_randomized_dark.png';
import LightPatternedBackground from '@media/images/pattern_randomized_light.png';
import { useUserSettings } from '@store/userSettings';
import { useEffect } from 'react';


const SearchView = () => {
    const { prePageSteps, prePagesVisited, search } = useUserData();
    const allPrePageVisited = prePagesVisited(Object.keys(prePageSteps));

    if (search === undefined || !allPrePageVisited) {
        return <Navigate to={'/'} replace />
    }

    switch (search) {
        case SearchState.ACTIVE:
            return <ActiveSearch />
        case SearchState.RE_SEARCH:
            return <ReSearch />
        default:
            return <ActiveSearch />
    }
}

const ActiveSearch = () => {
    const navigate = useNavigate();
    const { theme } = useUserSettings();
    const BG = theme === 0 ? LightPatternedBackground : DarkPatternedBackground;
    const setSearch = useUserData(state => state.setSearch);

    useEffect(() => {
        setTimeout(() => {
            setSearch(SearchState.RE_SEARCH);
            navigate('/chat')
        }, 5000);
    }, []);

    return (
        <>
            <img src={BG} className={'object-none h-full w-full absolute top-0 left-0 z-0'} />
            <m.div className={`view !pt-1 z-10`} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col flex-grow'}>
                    active search
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'mégse'} className={'mb-3'} onClick={() => navigate(-1)} />
            </Footer>
        </>
    )
}

const ReSearch = () => {
    const { theme } = useUserSettings();
    const BG = theme === 0 ? LightPatternedBackground : DarkPatternedBackground;
    const setSearch = useUserData(state => state.setSearch);
    const navigate = useNavigate();

    const onReSearchButtonClicked = () => {
        setSearch(SearchState.ACTIVE);
        navigate('/search', { replace: true });
    }

    return (
        <>
            <img src={BG} className={'object-none h-full w-full absolute top-0 left-0 z-0'} />
            <m.div className={'view !pt-1 z-10'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col flex-grow'}>
                    ReSearch
                </div>
            </m.div>
            <Footer showVersion={false}>
                <p className={'text text-xl text-center mt-1 max-w-[400px]'}>
                    <span className={'font-bold'}>Élvezd</span> ki az anonimitás által nyújtott szabadságot és beszélgess ismeretlenekkel
                </p>
                <p className={'text text-sm dark:text-[#dbdbdb] text-gray-300 mt-2 mb-3'}>
                    Beszélgess, ismerj meg új embereket!
                </p>
                <Button onClick={onReSearchButtonClicked} size={'primary'} style={'filled'} text={'új partner keresése'} className={'mb-3'} />
                <p onClick={() => navigate('/pre/interests')} className={'cursor-pointer mt-1 mb-4 text text-sm dark:text-[#dbdbdb] text-gray-300 underline underline-offset-1'}>
                    Szűrő módosítása
                </p>
            </Footer>
        </>
    )
}

export default SearchView