import React, { ReactNode } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { config } from '../config/headerConfig';
import { useLocation } from 'react-router-dom';
import { getURLSegment } from '../utils/url';
import NavigationHeader from './NavigationHeader';

function Header() {
    const location = useLocation();

    const header = (): ReactNode => {
        const segment: string | undefined = getURLSegment(location.pathname, 0);

        if (segment === undefined) return <></>;

        if (config.useNavigationRoutes.includes(segment)) {
            return <NavigationHeader />;
        } else if (segment === 'chat') {
            return <>chat</>;
        } else return <></>;
    }

    return (
        <AnimatePresence>
            <m.div className={'header'} initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                {header()}
            </m.div>
        </AnimatePresence>
    );
}

export default Header