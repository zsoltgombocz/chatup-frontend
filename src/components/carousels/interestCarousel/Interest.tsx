import { useEffect, useState } from 'react'
import { motion as m, useAnimationControls } from 'framer-motion';
import { useUserSettings } from '../../../store/userSettings';
import { useInterestPreferences } from '../../../store/interestPreferences';
import useAchievement from '../../../hooks/useAchievement';
import { config } from '../../../config/interestConfig';
import { InterestInterface } from '../../../utils/interfaces/interestInterface';
import useSound from 'use-sound';

type Props = {
    id: string,
    src: string | undefined,
    display: string,
    defaultSelected?: boolean,
    onClick?: undefined | Function,
    disabled?: boolean
}

const Interest = ({ id, src, display, defaultSelected = false, disabled = false }: Props) => {
    const [selected, setSelected] = useState(defaultSelected);
    const userColor = useUserSettings(state => state.color);
    const updateInterests = useInterestPreferences(state => state.updateInterests);
    const [funInterestClicked, setFunInterestClicked] = useState(0);
    const [interestData, setInterestData] = useState<InterestInterface>({ id, src: src ?? '', display });

    const controls = useAnimationControls()

    const { achievementCompleted, isAchievementCompleted } = useAchievement();

    const onInterestClick = () => {
        if (id === 'fun') {
            setFunInterestClicked(funInterestClicked + 1);
        }
        if (disabled) return;

        setSelected(!selected);
        updateInterests(id, !selected);
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
            const interest = config.interests.find(interest => interest.id === 'dua_lipa');
            if (interest === undefined) return;
            setSelected(false);
            transformInterestInto(interest);

            const [play] = useSound('../../../media/sounds/dua_lipa.mp3');
            play();

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

export default Interest