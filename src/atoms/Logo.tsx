import React from 'react'
type size = 'small' | 'medium' | 'big';
type Props = {
    customColor?: string | undefined
    size?: size,
    className?: string
}

function Logo({ customColor = undefined, size = 'small', className }: Props) {
    //! TODO: GET SAVED PRIMARY COLOR
    const textColor = customColor !== undefined ? `text-[${customColor}]` : 'text-pr-blue';
    const initialLetterSize = {
        'small': 'text-xl',
        'medium': 'text-5xl',
        'big': 'text-8xl',
    }
    const letterSize = {
        'small': 'text-base',
        'medium': 'text-4xl',
        'big': 'text-6xl',
    }

    return (
        <div className={`font-logo ${letterSize[size]} text-gray-600 dark:text-white ${className} text-center`}>
            <span className={`${initialLetterSize[size]} ${textColor}`}>C</span>HATUP
        </div>
    )
}

export default Logo