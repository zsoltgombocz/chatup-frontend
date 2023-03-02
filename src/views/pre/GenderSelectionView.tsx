import { motion as m } from 'framer-motion';
import Footer from '@layout/Footer';
import TextCarousel from '@components/carousels/TextCarousel';
import genderCarouselData from '@config/carousels/gender.json';
import Button from '@components/Button';
import Switch from '@components/Switch';
import { config } from '@config/genderConfig';
import { useGenderPreferebces } from '@store/genderPreferences';

function SexSelectionView() {
    const ownGenderState = useGenderPreferebces(state => state.ownGender);
    const partnerGenderState = useGenderPreferebces(state => state.partnerGender);

    const setOwnsex = useGenderPreferebces(state => state.setOwnGender);
    const setPartnerSex = useGenderPreferebces(state => state.setPartnerGender);

    const ownSexChanged = (index: number) => {
        setOwnsex(index);
    }
    const partnerSexChanged = (index: number) => {
        setPartnerSex(index);
    }

    return (
        <>
            <m.div className={'scrollable-view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-between flex-grow'}>
                    <div className={'flex flex-col flex-grow content-evenly mb-8'}>
                        <div className={'flex flex-col flex-auto'}>
                            <h5 className={'text-cabin font-semibold text-center text-xl mb-3'}>Válaszd ki a nemed:</h5>
                            <p className={'font-light text-sm text text-center mb-6'}>Kérjük, hogy a valós nemed add meg a komoly és eredménydús beszélgetés érdekében.</p>

                            <Switch options={config.ownGender} className={'mb-6 self-center'} initialSelectedIndex={ownGenderState} onChange={ownSexChanged} />
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