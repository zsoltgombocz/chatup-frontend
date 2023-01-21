import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    linkTo: string,
    children: ReactNode | string,
    noStyle?: boolean
}

const LinkButton = ({ linkTo, children, noStyle = false }: Props) => {
    return <Link className={!noStyle ? 'link-basic' : ''} to={linkTo}>{children}</Link>
}

export default LinkButton