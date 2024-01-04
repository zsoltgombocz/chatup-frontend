import { useEffect, useState } from 'react';
import Logo from '@atoms/Logo';
import Version from '@atoms/Version';
import { AnimatePresence, motion as m } from 'framer-motion';
import Button from '@components/Button';
import LinkButton from '@components/LinkButton';
import { socket } from '@/socket';
import { useSocketStore } from '@/store/socketStore';
import LoadingIcon from '@/atoms/LoadingIcon';
import { useApplicationStore } from '@/store/applicationStore';

//TODO: Add text showing that the server is unreachable 

const HomeView = () => {
    const socketState = useSocketStore(state => state.connected);
    const { firstLoad, setFirstLoadTo } = useApplicationStore();

    useEffect(() => {
        if (firstLoad) {
            setTimeout(() => setFirstLoadTo(false), 1000);
        }
    }, []);

    return (
        <div className={'relative flex flex-col justify-center items-center w-screen h-screen bg-bg-light-outer dark:bg-bg-dark-outer'}>
            <m.div
                className={'mb-14'}
                initial={{ y: 0 }}
                animate={!firstLoad && { y: -100 }}
                exit={{ y: 0 }}
            >
                <Logo size={'xl'} />
                <AnimatePresence>
                    {firstLoad ? (<Version showEnv={true} />) : (
                        <m.div className={'text-2xl dark:text-white text-gray-600 dark:font-pridi text-center'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Beszélgess ismeretlenekkel!
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>
            <AnimatePresence>
                {firstLoad && (
                    <div className={'w-14 h-14'}>
                        <LoadingIcon size={13} />
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!socketState && !firstLoad && (
                    <m.div className={'text-base dark:text-white text-gray-600 dark:font-pridi text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Nem sikerült kapcsolatot létesíteni a szerverrel! <br />
                        Kérjük próbáld újra késöbb!
                    </m.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!firstLoad && (<div className={'absolute bottom-20 flex flex-col gap-5 justify-center items-center'}>
                    <m.div
                        initial={{ opacity: 0, y: -250 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -250 }}
                    >
                        <Button size={'primary'} style={'filled'} text={'chat indítása'} linkTo={'pre/location'} disabled={!socketState} />
                    </m.div>
                    <m.div
                        initial={{ opacity: 0, y: -250 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -250 }}
                    >
                        <Button size={'secondary'} style={'outlined'} text={'beállítások'} linkTo={'settings'} />
                    </m.div>
                </div>)}
            </AnimatePresence>
        </div>
    );
};

export default HomeView;