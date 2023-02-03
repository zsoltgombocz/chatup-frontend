import React from 'react'
import Button from '../components/Button'
import InterestCarousel from '../components/carousels/interestCarousel/InterestCarousel'
import { config } from '../config/interestConfig'
import Footer from '../layout/Footer'
import { motion as m } from 'framer-motion';

function InterestSelectionView() {
    return (
        <>
            <m.div className={'view !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex flex-col content-evenly flex-grow'}>
                    <div className={'flex flex-col'}>
                        <h5 className={'text-cabin font-semibold text-center text-xl mb-3'}>Válassz ki 3 témát:</h5>
                        <p className={'font-light text-sm text text-center'}>A kiválasztott témák segitenek a partnerednek abban, hogy milyen témák érdekelnek téged.</p>
                    </div>
                    <div className={'flex flex-grow justify-center'}>
                        <InterestCarousel data={config.interests.sort(() => 0.5 - Math.random())} />
                    </div>
                </div>
            </m.div>
            <Footer showVersion={false}>
                <Button size={'primary'} style={'filled'} text={'keresés'} linkTo={'/search'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default InterestSelectionView