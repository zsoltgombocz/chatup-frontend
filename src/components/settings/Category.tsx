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
        <Link to={redirect} className={'mb-5'}>
            <div className={'flex flex-row text text-xl'}>
                <div className={'flex flex-grow gap-3 w-full items-center'}>
                    <span>{icon}</span>
                    <span>{text}</span>
                </div>

                <ChevronRightIcon className={'h-7 w-7 self-center'} /></div>
        </Link>
    )
}

export default Category