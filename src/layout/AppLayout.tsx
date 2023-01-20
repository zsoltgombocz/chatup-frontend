import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';

type Props = {
    disableLayout?: boolean
}
const AppLayout = ({ disableLayout = false }: Props) => {
    return disableLayout ? <Outlet /> : (<div className={'bg-bg-light-inner dark:bg-bg-dark-inner flex flex-col w-full'}>
        <Header visible={true} />
        <Outlet />
        <div>footer</div>
    </div>);
}

export default AppLayout;