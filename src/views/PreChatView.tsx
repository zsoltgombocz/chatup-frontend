import React from 'react'

import { motion as m } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
function PreChatView() {
    return (
        <m.div className={'scrollable-view'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
            Pre
        </m.div>
    );
}
export default PreChatView