import { SignalSlashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { GeoLocationPermission } from '../utils/enums'
import { CountyInterface } from '../utils/interfaces/map'
import LoadingIcon from './LoadingIcon'

type GeoLocation = {
    permission: GeoLocationPermission,
    county: CountyInterface | null
}

type GeoLocationWrapper = {
    children: any
}

const GeoLocationWrapper = ({ children }: GeoLocationWrapper) => {
    return <p className={'text-cabin font-extralight text-sm text-center'}>{children}</p>;
}

const GeoLocation = ({ permission, county }: GeoLocation) => {
    switch (permission) {
        case GeoLocationPermission.PROMPT:
            return <GeoLocationWrapper><LoadingIcon size={5} /></GeoLocationWrapper>
        case GeoLocationPermission.GRANTED:
            return <GeoLocationWrapper>Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>{county?.name}</span> vármegye</GeoLocationWrapper>
        case GeoLocationPermission.DENIED:
            return <GeoLocationWrapper><SignalSlashIcon width={15} height={15} className={'inline-block'} /> Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>Budapest</span> vármegye</GeoLocationWrapper>
    }
}

export default GeoLocation