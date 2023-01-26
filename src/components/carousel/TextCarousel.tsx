import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { TextPage } from './TextPage';
import TextCarouselNavigator from './TextCarouselNavigator';

type Props = {
    data: PageInterface[],
    className: string,
}

interface PageInterface {
    title: string,
    text: string,
}

export const TextCarousel = ({ data, className }: Props) => {
    const [active, setActive] = useState(0);
    return (
        <div className={className}>
            <Swiper
                modules={[Pagination]}
                className="w-full flex flex-col h-fit"
                onSlideChange={(swiper) => setActive(swiper?.activeIndex)}
            >
                {data.map(page => <SwiperSlide className='p-1'><TextPage title={page.title} text={page.text} /></SwiperSlide>)}
                <TextCarouselNavigator max={data.length} className={'mt-3'} activeIndex={active} />
            </Swiper>
        </div>
    );
}

export default TextCarousel