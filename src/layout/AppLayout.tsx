import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { config } from '../config/footerConfig';
import { getURLSegment } from '../utils/url';

type Props = {
    disableLayout?: boolean
}
const AppLayout = ({ disableLayout = false }: Props) => {
    const location = useLocation();
    const [currentMainRoute, setCurrentMainRoute] = useState('');
    useEffect(() => {
        const segment = getURLSegment(location.pathname, 0);

        if (segment !== undefined)
            setCurrentMainRoute(segment);
    }, [location.pathname])


    return disableLayout ? <Outlet /> : (
        <div className={'bg-bg-light-inner dark:bg-bg-dark-inner flex flex-col w-full h-screen'}>
            <Header />
            <AnimatePresence>
                <Outlet />
            </AnimatePresence>
            {config.useStaticFooterRoutes.includes(currentMainRoute) && <Footer />}
        </div>);
}

export default AppLayout;