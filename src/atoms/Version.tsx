const Version = () => {
    //! TODO: DO NOT READ FROM .ENV
    return (
        <div className={'text-center'}>
            <div className={'text'}>Verzió {import.meta.env.VITE_APP_VERSION}</div>
            {import.meta.env.VITE_APP_ENV !== 'prod'
                && (<div className={'text text-xs'}>Fejlesztési környezet</div>)}
        </div>
    )
}

export default Version;