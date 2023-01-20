const Version = () => {
    //! TODO: DO NOT READ FROM .ENV
    return (
        <div className={'text-gray-600 dark:text-white font-pridi text-center'}>Verzió {import.meta.env.VITE_APP_VERSION}</div>
    )
}

export default Version;