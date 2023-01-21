import React, { useEffect, useState } from 'react';
import Logo from '../atoms/Logo';
import Version from '../atoms/Version';
import { AnimatePresence, motion as m } from 'framer-motion';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';


const HomeView = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        //! WHEN NAVIGATING BACK CHECK THE READYNESS OF THE APP OR JUST DO LOADING AGAIN?
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <div className={'flex flex-col justify-center items-center w-screen h-screen bg-bg-light-outer dark:bg-bg-dark-outer'}>
            <m.div
                className={'mb-28'}
                initial={{ y: 0 }}
                animate={!isLoading && { y: -100 }}
                exit={{ y: 0 }}
            >
                <Logo size={'big'} />
                <AnimatePresence>
                    {isLoading ? (<Version />) : (
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
                {!isLoading && (<div className={'absolute bottom-20 flex flex-col gap-5 justify-center items-center'}>
                    <m.div
                        initial={{ opacity: 0, y: -250 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -250 }}
                    >
                        <Button size={'primary'} style={'filled'} text={'chat indítása'} />
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

            <AnimatePresence>
                {isLoading && (
                    <m.div key="dev"
                        initial={{ y: 250 }}
                        animate={{ y: 0 }}
                        exit={{ y: 250 }}
                        className={'absolute bottom-16'}><LinkButton linkTo={'devlog'}>
                            Development log</LinkButton></m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeView;