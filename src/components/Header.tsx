import React, { ReactNode } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { config } from '../config/headerConfig';
import { useLocation } from 'react-router-dom';
import { getURLSegment } from '../utils/getURLSegment';

type Props = {
    visible: boolean,
}

function Header({ visible = true }: Props) {
    const location = useLocation();

    const header = (): ReactNode => {
        const segment: string | undefined = getURLSegment(location.pathname, 0);

        if (segment === undefined) return <></>;

        if (config.useNavigationRoutes.includes(segment)) {
            return <>nav</>;
        } else if (segment === 'chat') {
            return <>chat</>;
        } else return <></>;
    }

    return (
        <AnimatePresence>
            <div className={'flex justify-center items-center bg-bg-light-outer dark:bg-bg-dark-outer shadow-xl rounded-br-xl rounded-bl-xl py-5'}>
                {header()}
            </div>
        </AnimatePresence>
    );
}

export default Header