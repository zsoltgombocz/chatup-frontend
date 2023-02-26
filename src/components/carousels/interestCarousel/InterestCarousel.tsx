import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { InterestInterface } from '../../../utils/interfaces/interestInterface';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Interest from './Interest';
import CarouselNavigator from '../CarouselNavigator';
import { useInterestPreferences } from '../../../store/interestPreferences';
import { useUserData } from '../../../store/userData';
import { config } from '../../../config/interestConfig';

type Props = {
    data: InterestInterface[],
    className?: string,
    onItemClicked?: undefined | Function
}

export const InterestCarousel = ({ data }: Props) => {
    const [itemsPaginated, setItemsPaginated] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [active, setActive] = useState(0);

    const interests = useInterestPreferences(state => state.interests);
    const userAchievements = useUserData(state => state.achievements);

    useEffect(() => {
        const alterBasedOnAchievement = (array: any[]) => {
            const remove = userAchievements.includes('dua_lipa') ? 'fun' : 'dua_lipa';

            return array.filter(interest => interest.id !== remove);
        }

        const paginateData = (array: any[]) => {
            setItemsPaginated([]);
            for (let i = 0; i < array.length; i += itemsPerPage) {
                const chunk = array.slice(i, i + itemsPerPage);
                setItemsPaginated(prev => ([...prev, chunk]));
            }
        }

        const alteredData = alterBasedOnAchievement(data);
        paginateData(alteredData);
    }, [data, itemsPerPage]);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (h < 770) {
                if (w >= 500) {
                    setItemsPerPage(6);
                } else {
                    setItemsPerPage(4);
                }
            } else {
                if (w >= 475 && h > 880) {
                    setItemsPerPage(9);
                } else {
                    setItemsPerPage(6);
                }
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={'flex relative'}>
            <Swiper
                threshold={25}
                direction={"vertical"}
                modules={[Pagination]}
                className="h-fit max-w-md"
                autoHeight={true}
                onSlideChange={(swiper) => setActive(swiper?.activeIndex)}
            >
                {itemsPaginated.map((pages, index) =>
                    <SwiperSlide key={index} className='flex flex-wrap flex-grow justify-center items-center'>
                        {pages.map((interest: InterestInterface) =>
                            <Interest key={interest.id} id={interest.id}
                                src={interest.src} display={interest.display}
                                defaultSelected={interests.includes(interest.id)}
                                disabled={interests.length >= 3 && !interests.includes(interest.id)}
                            />
                        )}
                    </SwiperSlide>
                )}
            </Swiper>
            <CarouselNavigator max={itemsPaginated.length} className={'absolute right-0'} activeIndex={active} variant={1} />
        </div>
    );
}

export default InterestCarousel