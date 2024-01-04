import { ReactNode } from "react";

export interface menuElementInterface {
    icon: ReactNode,
    openIcon?: ReactNode,
    name: string,
    onClick: Function | undefined,
    order: number,
}