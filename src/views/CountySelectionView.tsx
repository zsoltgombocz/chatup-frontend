import React, { SyntheticEvent, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion';
import Footer from '../layout/Footer';
import TextCarousel from '../components/carousel/TextCarousel';
import countyCarouselData from '../config/carousels/county.json';
import Map from '../components/map/Map';
import RadioGroup from '../components/RadioGroup';
import { useUserSettings } from '../store/userSettings';
import Button from '../components/Button';
interface Box {
    id: string,
    state: boolean,
}

const CountySelectionView = () => {
    const updateMap = useUserSettings(state => state.setMap);
    const boxClicked = (e: SyntheticEvent<HTMLInputElement>) => {
        const ind: number = parseInt((e.target as HTMLInputElement).value);
        if (ind === 0) {
            updateMap('all', true);
        } else {
            updateMap('all', false);
        }
    }


    return (
        <>
            <m.div className={'scrollable-view !px-0 !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <h5 className={'text-cabin font-semibold text-center text-xl'}>Válassz vármegyét:</h5>
                <RadioGroup textClass={'text-base'} className={'mt-5 flex flex-row items-center justify-center gap-5'} onChange={boxClicked} selectedIndex={0} variant={'box'} options={['Országos', 'Egyéni']} name={'county_toggle'} radioGap={0} />
                <Map />
                <TextCarousel data={countyCarouselData} className={'!px-10 mt-10'} />
            </m.div>
            <Footer>
                <Button size={'primary'} style={'filled'} text={'tovább'} linkTo={'/pre?t=sex'} />
            </Footer>
        </>
    )
}

export default CountySelectionView