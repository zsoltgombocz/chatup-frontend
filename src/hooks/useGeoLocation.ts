import { useCallback, useEffect, useState } from "react";
import { counties } from "@config/mapConfig";
import { useUserData } from "@store/userData";
import { GeoLocationPermission, Location } from "@utils/enums";
import { isSimilar } from "@utils/string";
import { UserLocation } from "@utils/types";
interface GeoLocationInterface {
    lat: number,
    lon: number,

}
interface useGeoLocationInterface {
    permission: GeoLocationPermission | undefined,
    location: UserLocation,
}

const API_URL = import.meta.env.VITE_GEOAPI_URL;
const API_KEY = import.meta.env.VITE_GEOAPI_KEY;

export const useGeoLocation = (): useGeoLocationInterface => {
    const [permission, setPermission] = useState<GeoLocationPermission | undefined>(undefined);
    const setUserLocation = useUserData(state => state.setUserLocation);
    const userLocation = useUserData(state => state.location);

    const geoLocation = useCallback(async (location: GeoLocationInterface) => {
        fetch(`${API_URL}/reverse?apiKey=${API_KEY}&lat=${location?.lat}&lon=${location?.lon}`)
            .then(response => response.json())
            .then(async result => {
                const county: string | null = result.features[0].properties.county || await getCountyBasedoOnFormattedText(result.features[0].properties.formatted);
                let userCounty: UserLocation;
                if (county === null) userCounty = Location.UNKNOWN;
                else userCounty = counties.filter(c => isSimilar(c.name, county))[0].id;

                console.log('geoloc', userCounty);
                setUserLocation(userCounty ?? Location.UNKNOWN);
            })
            .catch(err => {
                console.error(err);
                setUserLocation(Location.UNKNOWN)
            });
    }, []);

    //Emergency call when no county found in reverse geolocation
    const getCountyBasedoOnFormattedText = (text: string): Promise<null | string> => {
        return new Promise(async (resolve, reject) => {
            fetch(`${API_URL}/search?apiKey=${API_KEY}&text=${text}`)
                .then(response => response.json())
                .then(result => {
                    resolve(result.features[0].properties.county || null);
                })
                .catch(err => {
                    resolve(null)
                });
        });
    }

    const getLocation = (): void => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const coordinates = { lat: coords.latitude, lon: coords.longitude };
                geoLocation(coordinates);
                setPermission(GeoLocationPermission.GRANTED);
            },
            (err) => {
                setPermission(GeoLocationPermission.DENIED);
                setUserLocation(Location.UNKNOWN);
            }
        );
    }

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' })
            .then(perm => {
                const p = perm.state.toUpperCase();
                setPermission(GeoLocationPermission[p as keyof typeof GeoLocationPermission]);
            });
    }, []);

    useEffect(() => {
        console.log(userLocation);
        if ((permission === GeoLocationPermission.PROMPT || permission === GeoLocationPermission.GRANTED)
            && (userLocation === Location.NOT_DEFINED || userLocation === Location.UNKNOWN)) {
            console.log('bejon')
            getLocation();
        }

        if (permission === GeoLocationPermission.DENIED) setUserLocation(Location.UNKNOWN);
    }, [permission]);

    return { permission, location: userLocation };
}