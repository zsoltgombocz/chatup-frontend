import React, { ReactNode, useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { config } from '../config/headerConfig';
import { useLocation } from 'react-router-dom';
import { getURLSegment } from '../utils/url';
import NavigationHeader from '../components/NavigationHeader';

function Header() {
    const location = useLocation();
    const [showNavigation, setShowNavigation] = useState(true);

    useEffect(() => {
        const segment: string | undefined = getURLSegment(location.pathname, 0);
        setShowNavigation(config.useNavigationRoutes.includes(segment || ''));

        return () => {
            console.log('header unmount')
        }
    }, [location.pathname]);


    return (
        <AnimatePresence>
            <m.div className={'header'}
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                exit={{ y: -30 }}
            >
                {
                    showNavigation ? <NavigationHeader /> : <>chat</>
                }
            </m.div>
        </AnimatePresence>
    );
}

export default Header