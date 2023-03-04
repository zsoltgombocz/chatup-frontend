import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { InterestInterface } from '@utils/interfaces/interestInterface';
import CarouselNavigator from './CarouselNavigator';
import { useInterestPreferences } from '@store/interestPreferences';
import { useUserData } from '@store/userData';
import { config } from '@config/interestConfig';
import { useUserSettings } from '@store/userSettings';
import { motion as m, useAnimationControls } from 'framer-motion';
import useAchievement from '@hooks/useAchievement';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Mousewheel } from "swiper";

type Props = {
    data: InterestInterface[],
    className?: string,
    onItemClicked?: undefined | Function
}

type InterestProps = {
    id: string,
    src: string | undefined,
    display: string,
    defaultSelected?: boolean,
    onClick?: undefined | Function,
    disabled?: boolean,
    triggerRender?: Function | undefined,
}

const InterestCarousel = ({ data }: Props) => {
    const [itemsPaginated, setItemsPaginated] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [active, setActive] = useState(0);
    const [triggerRender, setTriggerRender] = useState(false);

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
    }, [data, itemsPerPage, triggerRender]);

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
                modules={[Pagination, Mousewheel]}
                className="h-fit max-w-md"
                grabCursor={true}
                autoHeight={true}
                mousewheel={true}
                onSlideChange={(swiper) => setActive(swiper?.activeIndex)}
            >
                {itemsPaginated.map((pages, index) =>
                    <SwiperSlide key={index} className='flex flex-wrap flex-grow justify-center items-center'>
                        {pages.map((interest: InterestInterface) =>
                            <Interest key={interest.id} id={interest.id}
                                src={interest.src} display={interest.display}
                                defaultSelected={interests.includes(interest.id)}
                                triggerRender={setTriggerRender}
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

const Interest = ({ id, src, display, defaultSelected = false, disabled = false, triggerRender }: InterestProps) => {
    const [selected, setSelected] = useState(defaultSelected);
    const userColor = useUserSettings(state => state.color);
    const updateInterests = useInterestPreferences(state => state.updateInterests);
    const [funInterestClicked, setFunInterestClicked] = useState(0);
    const [interestData, setInterestData] = useState<InterestInterface>({ id, src: src ?? '', display });

    const controls = useAnimationControls()

    const { achievementCompleted, isAchievementCompleted } = useAchievement();

    const onInterestClick = () => {
        if (interestData.id === 'fun') {
            setFunInterestClicked(funInterestClicked + 1);
        }
        if (disabled) return;

        toggleInterest();
    }

    useEffect(() => {
        console.log(interestData)
        console.log(selected)
    }, [interestData, selected])


    const toggleInterest = (forceState: boolean | undefined = undefined) => {
        setSelected(forceState !== undefined ? forceState : !selected);
        updateInterests(interestData.id, forceState !== undefined ? forceState : !selected);
    }

    const transformInterestInto = async (interest: InterestInterface) => {
        await controls.start({
            scale: 0,
            transition: {
                duration: 0.1
            }
        });

        setInterestData(interest);
        await controls.start({
            scale: 1.1,
            transition: {
                duration: 0.1
            }
        });
        await controls.start({
            scale: 1,
            transition: {
                duration: 0.1
            }
        });
    }

    useEffect(() => {
        if (funInterestClicked >= 15 && id === 'fun' && !isAchievementCompleted('dua_lipa')) {
            achievementCompleted('dua_lipa');
            const duaLipaInterest = config.interests.find(interest => interest.id === 'dua_lipa');
            if (duaLipaInterest === undefined) return;

            toggleInterest(false);
            transformInterestInto(duaLipaInterest);

            triggerRender?.();
        }
    }, [funInterestClicked]);

    return (
        <div className={'flex flex-col p-1 w-32 h-40 items-evenly justify-evenly select-none'} id={interestData.id}>
            <div className={'relative flex items-center justify-center'}>
                <m.img
                    loading={'lazy'}
                    src={interestData.src}
                    className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} interest border-color-blue z-50 ${selected ? 'saturate-100' : 'saturate-0'}`}
                    onClick={onInterestClick}
                    animate={controls}
                />
                <m.div initial={{ opacity: 0 }} animate={selected ? { opacity: 1 } : { opacity: 0 }} className={`bg-${userColor} absolute z-0 rounded-full w-[116px] h-[116px]`} />
            </div>
            <span className={'text text-base text-center'}>{interestData.display}</span>
        </div>
    )
}

export default InterestCarousel