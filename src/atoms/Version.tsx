import versions from '@config/Versions.json';

type Props = {
    showEnv?: boolean,
    className?: string
}

const Version = ({ showEnv = false, className }: Props) => {
    const env = import.meta.env.VITE_APP_ENV;
    return (
        <div className={`text-center ${className}`}>
            <div className={'text'}>Verzió {versions[versions.length - 1].version}</div>
            {showEnv && env !== 'prod'
                && (<div className={'text text-xs'}>Fejlesztési környezet</div>)}
        </div>
    )
}

export default Version;