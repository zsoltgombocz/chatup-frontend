import React from 'react'
import versions from '../config/Versions.json';
import { motion as m } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const DevlogView = () => {
    return (
        <m.div className={'scrollable-view'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
            {versions.map(version =>
            (<>
                <h4 className={'text text-xl mb-3'}>Verzió {version.version}</h4>
                {version.changes.map(ch => <div className={'pl-3 text mb-1 mt-0 flex w-full'}>
                    <ChevronRightIcon className={'w-5 h-5 flex-none'} />
                    <span className={'break-words flex-grow font-extralight'}>{ch}</span>
                </div>)}
            </>)
            )}
        </m.div>
    );
}

export default DevlogView