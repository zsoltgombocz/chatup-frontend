import { InformationCircleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion as m } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';
import { useToastStore } from '@store/toastStore';
import { useUserSettings } from '@store/userSettings';



const Toast = () => {
    const { hide, visible, title, text, hideAfter, icon } = useToastStore();
    const userColor = useUserSettings(state => state.color);
    const iconClasses = `w-10 h-10 text-primary-${userColor}`;

    const icons: { [id: string]: ReactElement } = {
        'trophy': <TrophyIcon className={iconClasses} />,
        'info': <InformationCircleIcon className={iconClasses} />
    }

    const [open, setOpen] = useState(false);
    useEffect(() => {
        let timeout: any;
        setTimeout(() => setOpen(true), 250);
        if (visible && hideAfter !== undefined) {
            timeout = setTimeout(() => closeAndHide(), (hideAfter ?? 5000) + 250);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [visible]);

    const closeAndHide = () => {
        setTimeout(() => {
            setOpen(false);
            setTimeout(() => {
                hide();
            }, 500);
        }, 250);
    }
    return (
        <AnimatePresence>
            {visible &&
                <div className='absolute top-5 mx-auto w-screen p-3'>
                    <m.div
                        whileTap={{ scale: 0.95 }}
                        onTouchEnd={closeAndHide}
                        onClick={closeAndHide}
                        initial={{ y: -200 }}
                        animate={visible ? { y: 0 } : { y: -200 }}
                        exit={{ y: -200, transitionEnd: { display: 'none' } }}
                        style={{ borderRadius: 100, borderWidth: 1 }}
                        layout
                        className={`toast-base ${open ? 'w-fit' : 'w-16 w-max-[100%]'} border border-color-${userColor}`}
                    >
                        <m.div layout className={`toast-icon`}>
                            {icons[icon || 'info']}
                        </m.div>
                        {open && <>
                            <m.div layout className={'p-2 pr-5 flex flex-col justify-center w-[100%]'} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }} exit={{ opacity: 0 }}>
                                <h5 className={'text font-semibold'}>{title}</h5>
                                <p className={'text text-sm'}>{text}</p>
                            </m.div>
                            {hideAfter && <m.div
                                initial={{ scaleX: 1 }}
                                animate={{
                                    scaleX: 0, transition: {
                                        type: "tween",
                                        duration: (hideAfter) / 1000,
                                        delay: 0.2,
                                        ease: "linear",
                                    },
                                }}
                                className={`bg-${userColor} w-[calc(100%-2.5rem)] h-[0.2rem] absolute bottom-0 left-5 rounded-xl`}>
                            </m.div>}
                        </>}

                    </m.div></div>}
        </AnimatePresence >
    )
}

export default Toast