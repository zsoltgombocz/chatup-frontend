import Button from '@components/Button'
import InterestCarousel from '@components/carousels/InterestCarousel'
import { config } from '@config/interestConfig'
import Footer from '@layout/Footer'
import { useInterestPreferences } from '@store/interestPreferences';
import { useUserData } from '@store/userData';
import { PrePage } from '@utils/enums';
import { InterestInterface } from '@utils/interfaces/interestInterface';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterestSelectionView = () => {
    const markPageAsVisited = useUserData(state => state.markPageAsVisited);
    const interests = useInterestPreferences(state => state.interests);
    const navigate = useNavigate();
    const [shuffledData, setShuffledData] = useState<InterestInterface[]>([]);

    useEffect(() => {
        setShuffledData(config.interests.sort(() => 0.5 - Math.random()));

        window.onpopstate = () => {
            navigate('/pre/gender', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (interests.length === 3) {
            const markable = markPageAsVisited(PrePage.INTERESTS);
            if (!markable) navigate('/', { replace: true })
        }
    }, [interests]);
    return (
        <>
            <m.div className={'view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-evenly flex-grow'}>
                    <div className={'flex flex-col'}>
                        <p className={'font-light text-sm text text-center'}>A kiválasztott témák segitenek a partnerednek abban, hogy milyen témák érdekelnek téged.</p>
                    </div>
                    <div className={'flex flex-grow justify-center'}>
                        <InterestCarousel data={shuffledData} />
                    </div>
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button disabled={interests.length < 3} linkTo={'/search'} size={'primary'} style={'filled'} text={'keresés'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default InterestSelectionView