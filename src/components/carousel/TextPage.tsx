import React from 'react'

type Props = {
    title: string,
    text: string,
}

export const TextPage = ({ title, text }: Props) => {
    return (<div>
        <h5 className={'text-cabin text-base font-bold text-center mb-3'}>{title}</h5>
        <p className={'text-cabin font-extralight text-sm text-justify leading-relaxed'}>{text}</p>
    </div>)
}