import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { config } from '../config/headerConfig';
import { getURLSegment } from '../utils/url';

function NavigationHeader() {
    const location = useLocation();
    const [title, setTitle] = useState('');
    useEffect(() => {
        const segment: string = getURLSegment(location.pathname, null) || '';
        console.log(segment);
        setTitle(config.routeNames[segment]);
    }, [location.pathname])

    return (
        <div className={'flex flex-row'}><span className={'text'}>{title}</span></div>
    )
}

export default NavigationHeader;