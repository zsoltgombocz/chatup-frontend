import { County } from "@utils/enums";

export interface CountyStateInterface extends CountyInterface {
    selected: boolean,
}

export interface CountyInterface {
    id: County,
    name: string,
    path: string,
}

export interface MapInterface {
    counties: CountyInterface[]
}