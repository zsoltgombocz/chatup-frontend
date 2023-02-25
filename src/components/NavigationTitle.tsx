import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { config } from '../config/headerConfig';
import { getURLSegment } from '../utils/url';

const NavigationTitle = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const segment: string = getURLSegment(location.pathname, null) || '';

        setTitle(config.routeNames[segment] ?? 'headerConfig: No entry');
    }, [location]);

    return <>{title}</>;
}

export default NavigationTitle