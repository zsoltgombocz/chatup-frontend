import { motion as m } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../layout/Footer';
import { useUserData } from '../store/userData';
import { SearchState } from '../utils/enums';

const Search = () => {
    const userSearchState = useUserData(state => state.search);

    if (userSearchState === undefined) return <Navigate to={'/'} replace />

    switch (userSearchState) {
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
    return (
        <>
            <m.div className={'view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-evenly flex-grow'}>
                    search
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'mégse'} className={'mb-3'} onClick={() => navigate(-1)} />
            </Footer>
        </>
    )
}

const ReSearch = () => {
    return (
        <>
            <m.div className={'view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-evenly flex-grow'}>
                    research
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button linkTo={'/pre/interest'} size={'primary'} style={'filled'} text={'mégse'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default Search