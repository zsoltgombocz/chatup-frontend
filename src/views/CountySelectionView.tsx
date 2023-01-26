import React from 'react'
import { motion as m } from 'framer-motion';
import Footer from '../layout/Footer';
import TextCarousel from '../components/carousel/TextCarousel';
import countyCarouselData from '../config/carousels/county.json';
import Map from '../components/map/Map';

const CountySelectionView = () => {
    return (
        <>
            <m.div className={'scrollable-view !px-0 !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <h5 className={'text-cabin font-bold text-center text-lg'}>Válassz vármegyét:</h5>
                <Map />
                <TextCarousel data={countyCarouselData} className={'!px-10'} />
            </m.div>
            <Footer />
        </>
    )
}

export default CountySelectionView