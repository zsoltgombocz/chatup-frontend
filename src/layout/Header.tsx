import React, { ReactNode, useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { config } from '../config/headerConfig';
import { useLocation } from 'react-router-dom';
import { getURLSegment } from '../utils/url';
import NavigationHeader from '../components/NavigationHeader';
import useHeaderAnimate from '../hooks/useHeaderAnimate';

function Header() {
    const location = useLocation();
    const headerAnimate = useHeaderAnimate();
    const [showNavigation, setShowNavigation] = useState(true);

    useEffect(() => {
        const segment: string | undefined = getURLSegment(location.pathname, 0);
        setShowNavigation(config.useNavigationRoutes.includes(segment || ''));

        return () => {
            console.log('header unmount')
        }
    }, [location.pathname]);


    return (

        <m.div className={'header'}>
            {
                showNavigation ? <NavigationHeader /> : <>chat</>
            }
        </m.div>
    );
}

export default Header