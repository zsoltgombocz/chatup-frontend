import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import NavigationTitle from './NavigationTitle';

function NavigationHeader() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }
    return (
        <div className={'flex flex-row items-center text text-2xl'}>
            <ChevronLeftIcon className="absolute left-10 h-7 w-7 cursor-pointer" onClick={handleBackClick} />
            <NavigationTitle />
        </div>
    )
}

export default NavigationHeader;