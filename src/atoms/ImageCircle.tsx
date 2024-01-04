import { useUserSettings } from '@store/userSettings'
import classNames from 'classnames'
import React from 'react'

type Props = {
    src: string,
    size?: undefined | 'small' | 'medium' | 'large',
    hasBorder?: boolean
    disabled?: boolean,
    noColor?: boolean,
    onClick?: Function | undefined
}

const ImageCircle = ({ src, hasBorder = false, noColor = false }: Props) => {
    const userColor = useUserSettings(state => state.color);

    const border = classNames(
        { [`border-2 border-color-${userColor}`]: hasBorder }
    );

    const circleSize = classNames(
        'w-16 h-16'
    );

    return (
        <div className={`inline-flex rounded-full justify-center items-center ${circleSize} flex-grow flex-shrink-0 ${noColor ? 'saturate-100' : 'saturate-0'}`}>
            <img className={`image-circle rounded-full ${border} ${circleSize}`} src={src} />
        </div>
    )
}

export default ImageCircle