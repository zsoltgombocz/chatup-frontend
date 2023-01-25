import React, { ReactNode, useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { config } from '../config/headerConfig';
import { useLocation } from 'react-router-dom';
import { getURLSegment } from '../utils/url';
import NavigationHeader from '../components/NavigationHeader';

function Header() {
    const location = useLocation();
    const [showNavigation, setShowNavigation] = useState(true);
    const [hideRouteText, setHideRouteText] = useState(false);
    const [noBackground, setNoBackground] = useState(false);

    useEffect(() => {
        const segment: string | undefined = getURLSegment(location.pathname, 0);
        setShowNavigation(config.useNavigationRoutes.includes(segment || ''));
        setHideRouteText(config.onlyBackButtonRoutes.includes(segment || ''));
        setNoBackground(config.noBackground.includes(segment || ''));

        console.log(hideRouteText);
        return () => {
            console.log('header unmount')
        }
    }, [location.pathname]);


    return (
        <AnimatePresence>
            <m.div className={`header ${noBackground ? '!bg-transparent !shadow-none' : ''}`}
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                exit={{ y: -30 }}
            >
                {
                    showNavigation ? <NavigationHeader hideRouteText={hideRouteText} /> : <>chat</>
                }
            </m.div>
        </AnimatePresence>
    );
}

export default Header