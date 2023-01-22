import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';

type Props = {
    disableLayout?: boolean
}
const AppLayout = ({ disableLayout = false }: Props) => {
    return disableLayout ? <Outlet /> : (
        <div className={'bg-bg-light-inner dark:bg-bg-dark-inner flex flex-col w-full h-full'}>
            <Header />
            <AnimatePresence>
                <Outlet />
            </AnimatePresence>
        </div>);
}

export default AppLayout;