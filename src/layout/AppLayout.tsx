import React from 'react'
import { Outlet } from "react-router-dom";
type Props = {
    disableLayout?: boolean
}
const AppLayout = ({ disableLayout = false }: Props) => {
    return disableLayout ? <Outlet /> : (<>
        <div>head</div>
        <Outlet />
        <div>footer</div>
    </>);
}

export default AppLayout;