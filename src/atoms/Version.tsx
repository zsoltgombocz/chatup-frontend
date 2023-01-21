type Props = {
    showEnv?: boolean,
    className?: string
}

const Version = ({ showEnv = false, className }: Props) => {
    //! TODO: DO NOT READ FROM .ENV
    return (
        <div className={`text-center ${className}`}>
            <div className={'text'}>Verzió {import.meta.env.VITE_APP_VERSION}</div>
            {showEnv && import.meta.env.VITE_APP_ENV !== 'prod'
                && (<div className={'text text-xs'}>Fejlesztési környezet</div>)}
        </div>
    )
}

export default Version;