import Button from '@components/Button'
import InterestCarousel from '@components/carousels/InterestCarousel'
import { config } from '@config/interestConfig'
import Footer from '@layout/Footer'
import { useUserData } from '@store/userData';
import { PrePage } from '@utils/enums';
import { motion as m } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InterestSelectionView = () => {
    const markPageAsVisited = useUserData(state => state.markPageAsVisited);
    const navigate = useNavigate();

    useEffect(() => {
        const markable = markPageAsVisited(PrePage.INTERESTS);
        if (!markable) navigate('/', { replace: true });
    }, [])
    return (
        <>
            <m.div className={'view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-evenly flex-grow'}>
                    <div className={'flex flex-col'}>
                        <p className={'font-light text-sm text text-center'}>A kiválasztott témák segitenek a partnerednek abban, hogy milyen témák érdekelnek téged.</p>
                    </div>
                    <div className={'flex flex-grow justify-center'}>
                        <InterestCarousel data={config.interests.sort(() => 0.5 - Math.random())} />
                    </div>
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button linkTo={'/search'} size={'primary'} style={'filled'} text={'keresés'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default InterestSelectionView