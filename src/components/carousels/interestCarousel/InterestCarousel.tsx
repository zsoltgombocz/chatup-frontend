import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { InterestCarouselDataInterface } from '../../../utils/interfaces/components/interestCarousel';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Interest from './Interest';
import CarouselNavigator from '../CarouselNavigator';

type Props = {
    data: InterestCarouselDataInterface[],
    className?: string,
}

interface windowDimension {
    w: number,
    h: number
}

export const InterestCarousel = ({ data }: Props) => {
    const [itemsPaginated, setItemsPaginated] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const paginateData = (array: any[]) => {
            setItemsPaginated([]);
            for (let i = 0; i < array.length; i += itemsPerPage) {
                const chunk = array.slice(i, i + itemsPerPage);
                setItemsPaginated(prev => ([...prev, chunk]));
            }
        }

        paginateData(data);
        console.log(itemsPaginated.length);
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
        <div className={'flex'}>
            <Swiper
                threshold={25}
                direction={"vertical"}
                modules={[Pagination]}
                className="h-fit max-w-md"
                autoHeight={true}
                onSlideChange={(swiper) => setActive(swiper?.activeIndex)}
            >
                {itemsPaginated.map(pages =>
                    <SwiperSlide className='flex flex-wrap flex-grow justify-center items-center'>
                        {pages.map((interest: InterestCarouselDataInterface) =>
                            <Interest key={interest.id} src={interest.src} display={interest.display} />
                        )}
                    </SwiperSlide>
                )}
            </Swiper>
            <CarouselNavigator max={itemsPaginated.length} className={''} activeIndex={active} variant={1} />
        </div>
    );
}

export default InterestCarousel