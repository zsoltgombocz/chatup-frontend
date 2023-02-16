import { SignalSlashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { GeoLocationPermission } from '../utils/enums'
import { CountyInterface } from '../utils/interfaces/map'
import LoadingIcon from './LoadingIcon'

type GeoLocation = {
    permission: GeoLocationPermission,
    county: CountyInterface | null | undefined
}

type GeoLocationWrapper = {
    children: any
}

const GeoLocationWrapper = ({ children }: GeoLocationWrapper) => {
    return <div className={'text-cabin font-extralight text-sm text-center'}>{children}</div>;
}

const GeoLocation = ({ permission, county }: GeoLocation) => {
    const wildCard = (<GeoLocationWrapper><SignalSlashIcon width={15} height={15} className={'inline-block'} /> Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>Mindenhol</span></GeoLocationWrapper>);
    const loadingComponent = (<GeoLocationWrapper><LoadingIcon size={5} /></GeoLocationWrapper>);
    if (county === null) return wildCard;
    if (county === undefined) return loadingComponent;

    switch (permission) {
        case GeoLocationPermission.PROMPT:
            return loadingComponent;
        case GeoLocationPermission.GRANTED:
            return <GeoLocationWrapper>Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>{county?.name}</span> vármegye</GeoLocationWrapper>
        case GeoLocationPermission.DENIED:
            return wildCard;
    }
}

export default GeoLocation