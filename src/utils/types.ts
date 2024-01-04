import { County, Location } from "./enums"

export type IconProps = {
    size?: number,
    className?: string
}

export type UserLocation = County | Location;