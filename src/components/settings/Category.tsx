import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    icon?: ReactNode | undefined,
    text: string,
    redirect: string,
    rightIcon?: ReactNode | undefined
}

function Category({ icon = undefined, text, redirect, rightIcon = undefined }: Props) {
    return (
        <Link to={redirect} className={'flex text text-xl w-full items-center font-light'}>

            {icon && (<div className={'flex-none w-10'}>{icon}</div>)}
            <div className={'break-words flex-grow'}>{text}</div>
            {rightIcon ? rightIcon : <ChevronRightIcon className={'h-7 w-7 self-center text flex-none'} />}

        </Link>
    )
}

export default Category