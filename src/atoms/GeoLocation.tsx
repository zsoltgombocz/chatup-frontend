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

export const UserCounty = (
    { location, forceUnknown = false, bold = false }:
        { location?: UserLocation, forceUnknown?: boolean, bold?: boolean }
) => {
    const wildCard = (<span className={`${bold ? 'font-semibold' : ''}`}>Ismeretlen</span>);
    const countyName = counties.find(county => county.id === location)?.name || 'Hiányzó';
    if (location === Location.UNKNOWN || location === Location.NOT_DEFINED) return wildCard;

    return forceUnknown || location === undefined ? wildCard : <span className={`${bold ? 'font-semibold' : ''}`}>{countyName}</span>;
}

const GeoLocation = ({ permission, location }: GeoLocation) => {
    const loadingComponent = (<GeoLocationWrapper><LoadingIcon size={5} /></GeoLocationWrapper>);
    //if (location === Location.UNKNOWN) return wildCard;
    if (location === Location.NOT_DEFINED) return loadingComponent;

    //const countyName = counties.find(county => county.id === location)?.name || 'Hiányzó';

    switch (permission) {
        case GeoLocationPermission.PROMPT:
            return loadingComponent;
        case GeoLocationPermission.GRANTED:
            return <GeoLocationWrapper>Jelenlegi tartózkodási helyed: <UserCounty location={location} bold={true} /> vármegye</GeoLocationWrapper>
        case GeoLocationPermission.DENIED:
            return <GeoLocationWrapper>Jelenlegi tartózkodási helyed:<UserCounty forceUnknown={true} bold={true} /></GeoLocationWrapper>;
        default:
            return loadingComponent;
    }
}

export default GeoLocation