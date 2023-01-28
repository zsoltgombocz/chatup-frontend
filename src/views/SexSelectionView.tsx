import React from 'react'
import { motion as m } from 'framer-motion';
import Footer from '../layout/Footer';
import TextCarousel from '../components/carousel/TextCarousel';
import sexCarouselData from '../config/carousels/sex.json';
import Button from '../components/Button';
import Switch from '../components/Switch';
import { config } from '../config/sexConfig';
import { useSexPreferences } from '../store/sexPreferences';

function SexSelectionView() {
    const ownSexState = useSexPreferences(state => state.ownSex);
    const partnerSexState = useSexPreferences(state => state.partnerSex);

    const setOwnsex = useSexPreferences(state => state.setOwnSex);
    const setPartnerSex = useSexPreferences(state => state.setPartnerSex);

    const ownSexChanged = (index: number) => {
        setOwnsex(index);
    }
    const partnerSexChanged = (index: number) => {
        setPartnerSex(index);
    }
    return (
        <>
            <m.div className={'scrollable-view'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-between flex-grow'}>
                    <div className={'flex flex-col flex-grow content-evenly mb-8'}>
                        <div className={'flex flex-col flex-auto'}>
                            <h5 className={'text-cabin font-semibold text-center text-xl mb-3'}>Válaszd ki a nemed:</h5>
                            <p className={'font-light text-sm text text-center mb-6'}>Kérjük, hogy a valós nemed add meg a komoly és eredménydús beszélgetés érdekében.</p>

                            <Switch options={config.ownSex} className={'mb-6 self-center'} initialSelectedIndex={ownSexState} onChange={ownSexChanged} />
                        </div>
                        <div className={'flex flex-col flex-auto'}>
                            <h5 className={'text-cabin font-semibold text-center text-xl mb-6'}>Kivel szeretnél beszélgetni:</h5>
                            <Switch options={config.partnerSex} className={'mb-6 self-center'} initialSelectedIndex={partnerSexState} onChange={partnerSexChanged} />
                        </div>
                    </div>

                    <TextCarousel data={sexCarouselData} className={'mt-10'} />
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'tovább'} linkTo={'/pre?t=interest'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default SexSelectionView;