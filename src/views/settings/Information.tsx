import React from 'react'
import { motion as m } from 'framer-motion';
import { config } from '../../config/settingsConfig';
import Category from '../../components/settings/Category';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

function Information() {
    return (
        <m.div className={'scrollable-view gap-5'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
            {config.informationLinks.map(link => <Category text={link.display} redirect={link.route}
                rightIcon={link.name !== 'devlog' ?
                    <ArrowTopRightOnSquareIcon className={'h-7 w-7 self-center text flex-none'} /> : undefined}
            />)}
        </m.div>
    )
}

export default Information