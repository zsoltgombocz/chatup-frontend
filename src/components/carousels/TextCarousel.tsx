import { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselNavigator from './CarouselNavigator';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";


type Props = {
    data: PageInterface[],
    className: string,
}

type TextProps = {
    title: string,
    text: string,
}

interface PageInterface {
    title: string,
    text: string,
}

const TextCarousel = ({ data, className }: Props) => {
    const [active, setActive] = useState(0);
    return (
        <div className={className}>
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="w-full flex flex-col h-fit"
                onSlideChange={(swiper) => setActive(swiper?.activeIndex)}
            >
                {data.map(page => <SwiperSlide key={page.title} className='p-1 cursor-pointer select-none'><TextPage title={page.title} text={page.text} /></SwiperSlide>)}
                <CarouselNavigator max={data.length} className={'mt-3'} activeIndex={active} />
            </Swiper>
        </div>
    );
}

const TextPage = ({ title, text }: TextProps) => {
    return (<div>
        <h5 className={'text-cabin text-base font-bold text-center mb-3'}>{title}</h5>
        <p className={`text-cabin font-extralight text-sm text-justify md:text-center leading-relaxed`}>{text}</p>
    </div>)
}

export default TextCarousel