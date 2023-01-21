import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';

type Props = {
    disableLayout?: boolean
}
const AppLayout = ({ disableLayout = false }: Props) => {
    return disableLayout ? <Outlet /> : (
        <div className={'bg-bg-light-inner dark:bg-bg-dark-inner flex flex-col w-full h-full'}>
            <Header />
            <Outlet />
        </div>);
}

export default AppLayout;