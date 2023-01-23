import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    icon: ReactNode,
    text: string,
    redirect: string,
}

function Category({ icon, text, redirect }: Props) {
    return (
        <Link to={redirect} className={'flex text text-xl w-full items-center'}>

            <div className={'flex-none w-10'}>{icon}</div>
            <div className={'break-words flex-grow'}>{text}</div>
            <ChevronRightIcon className={'h-7 w-7 self-center text flex-none'} />

        </Link>
    )
}

export default Category