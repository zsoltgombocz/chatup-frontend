import { SyntheticEvent } from 'react'
import { motion as m } from 'framer-motion';
import Footer from '@layout/Footer';
import TextCarousel from '@components/carousels/TextCarousel';
import countyCarouselData from '@config/carousels/county.json';
import Map from '@components/Map';
import RadioGroup from '@components/RadioGroup';
import Button from '@components/Button';
import { useMapPreferences } from '@store/mapPreferences';
import { useGeoLocation } from '@hooks/useGeoLocation';
import GeoLocation from '@atoms/GeoLocation';

const CountySelectionView = () => {
    const setCheckbox = useMapPreferences(state => state.setTickedCheckbox);
    const selectedCheckbox = useMapPreferences(state => state.mapCheckbox)
    const selectedCounties = useMapPreferences(state => state.counties);

    const boxClicked = (e: SyntheticEvent<HTMLInputElement>) => {
        const ind: number = parseInt((e.target as HTMLInputElement).value);

        if (ind === 0) {
            setCheckbox(0);
        } else setCheckbox(1);
    }

    const { permission, location } = useGeoLocation();

    return (
        <>
            <m.div className={'scrollable-view !px-0 !pt-1'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <RadioGroup
                    textClass={'text-base'}
                    className={'mt-5 flex flex-row items-center justify-center gap-5'}
                    onChange={boxClicked}
                    selectedIndex={selectedCheckbox}
                    variant={'box'}
                    options={['Országos', 'Egyéni']}
                    name={'county_toggle'}
                    radioGap={0}
                />
                <Map />
                <GeoLocation permission={permission} county={location} />
                <TextCarousel data={countyCarouselData} className={'!px-10 mt-10'} />
            </m.div>
            <Footer showVersion={false}>
                <Button disabled={selectedCheckbox === 1 && selectedCounties.length < 1} size={'primary'} style={'filled'} text={'tovább'} linkTo={'/pre/gender'} className={'mb-3'} />
            </Footer>
        </>
    )
}

export default CountySelectionView