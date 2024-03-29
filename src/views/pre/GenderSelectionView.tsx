import { motion as m } from 'framer-motion';
import Footer from '@layout/Footer';
import TextCarousel from '@components/carousels/TextCarousel';
import genderCarouselData from '@config/json/GenderCarousel.json';
import Button from '@components/Button';
import Switch from '@components/Switch';
import { config } from '@config/genderConfig';
import { useGenderPreferebces } from '@store/genderPreferences';
import { useEffect } from 'react';
import { Gender, PrePage } from '@utils/enums';
import { useUserData } from '@store/userData';
import { useNavigate } from 'react-router-dom';

const SexSelectionView = () => {
    const ownGenderState = useGenderPreferebces(state => state.ownGender);
    const partnerGenderState = useGenderPreferebces(state => state.partnerGender);

    const setOwnsex = useGenderPreferebces(state => state.setOwnGender);
    const setPartnerSex = useGenderPreferebces(state => state.setPartnerGender);

    const markPageAsVisited = useUserData(state => state.markPageAsVisited);
    const navigate = useNavigate();

    const ownSexChanged = (index: number) => {
        setOwnsex(index === 0 ? Gender.MALE : Gender.FEMALE);
    }
    const partnerSexChanged = (index: number) => {
        setPartnerSex(index);
    }

    useEffect(() => {
        const markable = markPageAsVisited(PrePage.GENDER);
        if (!markable) navigate('/', { replace: true });

        window.onpopstate = () => {
            navigate('/pre/location', { replace: true });
        }
    }, [])


    return (
        <>
            <m.div className={'scrollable-view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-between flex-grow'}>
                    <div className={'flex flex-col flex-grow content-evenly mb-8'}>
                        <div className={'flex flex-col flex-auto'}>
                            <p className={'font-light text-sm text text-center mb-6'}>Kérjük, hogy a valós nemed add meg a komoly és eredménydús beszélgetés érdekében.</p>

                            <Switch options={config.ownGender} className={'mb-6 self-center'} initialSelectedIndex={ownGenderState === Gender.MALE ? 0 : 1} onChange={ownSexChanged} />
                        </div>
                        <div className={'flex flex-col flex-auto'}>
                            <h5 className={'text-cabin font-semibold text-center text-xl mb-6'}>Kivel szeretnél beszélgetni:</h5>
                            <Switch options={config.partnerGender} className={'mb-6 self-center'} initialSelectedIndex={partnerGenderState} onChange={partnerSexChanged} />
                        </div>
                    </div>

                    <TextCarousel data={genderCarouselData} className={'mt-10'} />
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'tovább'} linkTo={'/pre/interest'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default SexSelectionView;