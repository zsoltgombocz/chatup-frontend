import { counties } from '@config/mapConfig'
import { UserLocation } from '@utils/types'
import { GeoLocationPermission, Location } from '../utils/enums'
import LoadingIcon from './LoadingIcon'

type GeoLocation = {
    permission: GeoLocationPermission | undefined,
    location: UserLocation
}

type GeoLocationWrapper = {
    children: any
}

const GeoLocationWrapper = ({ children }: GeoLocationWrapper) => {
    return <div className={'text-cabin font-extralight text-sm text-center'}>{children}</div>;
}

const GeoLocation = ({ permission, location }: GeoLocation) => {
    const wildCard = (<GeoLocationWrapper> Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>Ismeretlen</span></GeoLocationWrapper>);
    const loadingComponent = (<GeoLocationWrapper><LoadingIcon size={5} /></GeoLocationWrapper>);
    if (location === Location.UNKNOWN) return wildCard;
    if (location === Location.NOT_DEFINED) return loadingComponent;

    const countyName = counties.find(county => county.id === location)?.name || 'Hiányzó';

    switch (permission) {
        case GeoLocationPermission.PROMPT:
            return loadingComponent;
        case GeoLocationPermission.GRANTED:
            return <GeoLocationWrapper>Jelenlegi tartózkodási helyed: <span className={'font-semibold'}>{countyName}</span> vármegye</GeoLocationWrapper>
        case GeoLocationPermission.DENIED:
            return wildCard;
        default:
            return loadingComponent;
    }
}

export default GeoLocation