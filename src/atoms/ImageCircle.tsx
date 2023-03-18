import { useUserSettings } from '@store/userSettings'
import classNames from 'classnames'
import React from 'react'

type Props = {
    src: string,
    size?: number | undefined,
    hasBorder?: boolean
    disabled?: boolean,
    onClick?: Function | undefined
}

const ImageCircle = ({ src, size = undefined, hasBorder = false, disabled = false, onClick = undefined }: Props) => {
    const userColor = useUserSettings(state => state.color);

    const border = classNames(
        { [`border-2 border-color-${userColor}`]: hasBorder }
    );

    return (
        <div className={`inline-flex w-fit h-fit rounded-full justify-center items-center`}>
            <img className={`image-circle rounded-full ${border}`} src={src} />
        </div>
    )
}

export default ImageCircle