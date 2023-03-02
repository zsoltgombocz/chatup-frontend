import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    linkTo: string,
    children: ReactNode | string,
    noStyle?: boolean,
    replace?: boolean,
}

const LinkButton = ({ linkTo, children, noStyle = false, replace = true }: Props) => {
    return <Link replace={replace} className={!noStyle ? 'link-basic' : ''} to={linkTo}>{children}</Link>
}

export default LinkButton