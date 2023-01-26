import { ReactElement, SVGProps } from "react";

export interface CountyInterface {
    id: string,
    name: string,
    isSelected: boolean,
    path: string,
}

export interface MapInterface {
    counties: CountyInterface[]
}