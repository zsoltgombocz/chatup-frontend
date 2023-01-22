import { EnvelopeIcon, FingerPrintIcon, PencilIcon, QuestionMarkCircleIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface CategoryInterface {
    name: string,
    display: string,
    route: string,
    icon: ReactNode
}

interface SettingsConfigInterface {
    categories: CategoryInterface[];
}

export const config: SettingsConfigInterface = {
    categories: [
        {
            name: 'privacy',
            display: 'Adatvédelem',
            route: '/settings/privacy',
            icon: <FingerPrintIcon className={'h-8 w-8 text self-start'} />
        },
        {
            name: 'customize',
            display: 'Testreszabás',
            route: '/settings/customize',
            icon: <PencilIcon className={'h-8 w-8 text self-start'} />
        },
        {
            name: 'information',
            display: 'Névjegy',
            route: '/settings/information',
            icon: <UserIcon className={'h-8 w-8 text self-start'} />
        },
        {
            name: 'help',
            display: 'Súgó',
            route: '/settings/help',
            icon: <QuestionMarkCircleIcon className={'h-8 w-8 text self-start'} />
        },
        {
            name: 'contact',
            display: 'Kapcsolatfelvétel és hibajelentés',
            route: '/settings/contact',
            icon: <EnvelopeIcon className={'h-8 w-8 text self-start'} />
        }
    ]
}