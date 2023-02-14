import { useCallback, useEffect, useMemo, useState } from "react";
import { counties } from "../config/mapConfig";
import { useUserData } from "../store/userData";
import { GeoLocationPermission } from "../utils/enums";
import { GeoLocation } from "../utils/interfaces/geoLocation";
import { CountyInterface } from "../utils/interfaces/map";
import { isSimilar } from "../utils/string";

interface useGeoLocationInterface {
    permission: GeoLocationPermission,
    location: null | CountyInterface,
}

export const useGeoLocation = (): useGeoLocationInterface => {
    const [permission, setPermission] = useState<GeoLocationPermission>(GeoLocationPermission.DENIED);
    const setUserLocation = useUserData(state => state.setUserLocation);
    const userLocation = useUserData(state => state.location);

    const geoLocation = useCallback(async (location: GeoLocation) => {
        fetch(`https://api.geoapify.com/v1/geocode/reverse?apiKey=${import.meta.env.VITE_GEOAPI_KEY}&lat=${location?.lat}&lon=${location?.lon}`)
            .then(response => response.json())
            .then(result => {
                const county = result.features[0].properties.county;
                const similar = counties.filter(c => isSimilar(c.name, county));
                setUserLocation(similar[0]);
            })
            .catch(err => console.log(err))
    }, []);

    const getLocation = (): void => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const coordinates = { lat: coords.latitude, lon: coords.longitude };
                geoLocation(coordinates);
                setPermission(GeoLocationPermission.GRANTED);
            },
            (err) => { setPermission(GeoLocationPermission.DENIED); }
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
        if ((permission === GeoLocationPermission.PROMPT || permission === GeoLocationPermission.GRANTED)
            && userLocation === null) {
            getLocation();
        }
    }, [permission]);

    return { permission, location: userLocation };
}