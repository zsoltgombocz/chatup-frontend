import React, { useEffect, useState } from 'react'

import { motion as m } from 'framer-motion';
import Map from '../components/map/Map';
import { useSearchParams } from 'react-router-dom';
import CountySelectionView from './CountySelectionView';
import SexSelectionView from './SexSelectionView';
import InterestSelectionView from './InterestSelectionView';
function PreChatView() {
    const [searcParams] = useSearchParams();
    const [t, setT] = useState<null | string>(null);

    useEffect(() => {
        setT(searcParams.get('t'));
    }, [searcParams.get('t')]);

    switch (t) {
        case 'county':
            return <CountySelectionView />;
        case 'sex':
            return <SexSelectionView />;
        case 'interest':
            return <InterestSelectionView />;
        default:
            return <CountySelectionView />;
    }
}
export default PreChatView