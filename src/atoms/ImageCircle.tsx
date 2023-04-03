import { useUserSettings } from '@store/userSettings'
import classNames from 'classnames'
import React from 'react'

type Props = {
    src: string,
    size?: undefined | 'small' | 'medium' | 'large',
    hasBorder?: boolean
    disabled?: boolean,
    onClick?: Function | undefined
}

const ImageCircle = ({ src, size = undefined, hasBorder = false, disabled = false, onClick = undefined }: Props) => {
    const userColor = useUserSettings(state => state.color);

    const border = classNames(
        { [`border-2 border-color-${userColor}`]: hasBorder }
    );

    const circleSize = classNames(
        { 'w-14 h-14 lg:w-16 lg:h-16': size === 'small' },
        { 'w-16 h-16 lg:w-20 lg:h-20': size === undefined }
    );

    return (
        <div className={`inline-flex w-max h-max rounded-full justify-center items-center`}>
            <img className={`image-circle rounded-full ${border} ${circleSize}`} src={src} />
        </div>
    )
}

export default ImageCircle