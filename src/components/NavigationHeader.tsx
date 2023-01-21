import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config/headerConfig';
import { getURLSegment } from '../utils/url';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

function NavigationHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    useEffect(() => {
        const segment: string = getURLSegment(location.pathname, null) || '';

        setTitle(config.routeNames[segment]);
    }, [location.pathname]);

    const handleBackClick = () => {
        navigate(-1);
    }
    return (
        <div className={'flex flex-row items-center text'}>
            <ChevronLeftIcon className="absolute left-10 h-7 w-7 cursor-pointer" onClick={handleBackClick} />
            {title}
        </div>
    )
}

export default NavigationHeader;