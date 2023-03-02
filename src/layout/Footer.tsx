import React, { ReactNode } from 'react'
import Logo from '@atoms/Logo'
import { motion as m, AnimatePresence } from 'framer-motion';
import Version from '@atoms/Version';

type Props = {
    showLogo?: boolean,
    showVersion?: boolean,
    children?: string | ReactNode | undefined,
}

const Footer = ({ showLogo = true, showVersion = true, children = undefined }: Props) => {
    return (
        <AnimatePresence>
            <m.div className={`footer`}
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 20, opacity: 0 }}
                exit={{ y: 20, opacity: 0 }}
            >
                {children}
                {showLogo && (
                    <div className={'text-black dark:text-white flex flex-row justify-center items-center gap-1 font-medium'}>
                        Powered by
                        <Logo />
                    </div>
                )}
                {showVersion && (
                    <Version className={'text-xs'} />
                )}
            </m.div>
        </AnimatePresence>
    )
}

export default Footer