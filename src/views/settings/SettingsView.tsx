import React from 'react'
import Footer from '../../layout/Footer';
import { config } from '../../config/settingsConfig';
import Category from '../../components/settings/Category';
import { motion as m } from 'framer-motion';

function SettingsView() {
    return (
        <>
            <m.div className={'flex-grow h-fit flex overflow-auto flex-col px-10 py-10'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                {config.categories.map(category =>
                    <Category key={category.name} icon={category.icon} text={category.display} redirect={category.route} />
                )}
            </m.div>

            <Footer />
        </>);
}

export default SettingsView;