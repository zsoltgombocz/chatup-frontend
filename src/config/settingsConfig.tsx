import { EnvelopeIcon, FingerPrintIcon, MoonIcon, PencilIcon, QuestionMarkCircleIcon, SunIcon, UserIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface CategoryInterface {
    name: string,
    display: string,
    route: string,
    icon?: ReactNode
}

interface ThemeInterface {
    icon: ReactNode,
    text: string,
}

interface PrivacySwitchInterface {
    text: string,
    default: boolean,
    index: number
}
interface SettingsConfigInterface {
    categories: CategoryInterface[];
    themes: ThemeInterface[],
    colors: string[],
    privacySwitches: PrivacySwitchInterface[] | [],
    informationLinks: CategoryInterface[],
}

export const config: SettingsConfigInterface = {
    categories: [
        {
            name: 'privacy',
            display: 'Adatvédelem',
            route: '/settings/privacy',
            icon: <FingerPrintIcon className={'h-8 w-8 text'} />
        },
        {
            name: 'customize',
            display: 'Testreszabás',
            route: '/settings/customize',
            icon: <PencilIcon className={'h-8 w-8 text'} />
        },
        {
            name: 'information',
            display: 'Névjegy',
            route: '/settings/information',
            icon: <UserIcon className={'h-8 w-8 text'} />
        },
        {
            name: 'help',
            display: 'Súgó',
            route: '/settings/help',
            icon: <QuestionMarkCircleIcon className={'h-8 w-8 text'} />
        },
        {
            name: 'contact',
            display: 'Kapcsolatfelvétel és hibajelentés',
            route: '/settings/contact',
            icon: <EnvelopeIcon className={'h-8 w-8 text'} />
        }
    ],
    themes: [
        {
            icon: <SunIcon className={'w-7 h-7'} />,
            text: 'Világos'
        }, {
            icon: <MoonIcon className={'w-7 h-7'} />,
            text: 'Sötét'
        }
    ],
    colors: ['red', 'blue', 'green'],
    privacySwitches: [
        {
            text: 'Linkek küldése',
            default: false,
            index: 0,
        }, {
            text: 'Képek / Videók küldése',
            default: false,
            index: 1,
        }, {
            text: 'Aktivitási állapot megjelenítése',
            default: false,
            index: 2,
        }, {
            text: 'Elérhetőség jelzése (AFK)',
            default: false,
            index: 3,
        }, {
            text: 'Live-feedback követése',
            default: false,
            index: 4,
        }, {
            text: 'Felhasználói adatok gyűjtése',
            default: false,
            index: 5,
        }
    ],
    informationLinks: [
        {
            name: 'privacy-policy',
            display: 'Adatvédelem szabályzat',
            route: '/information/privacy-policy',
        },
        {
            name: 'terms-of-use',
            display: 'Felhasználási feltételek',
            route: '/information/terms-of-use',
        },
        {
            name: 'guide',
            display: 'Felhasználói útmutató szabályzat',
            route: '/information/guide',
        },
        {
            name: 'devlog',
            display: 'Development Log',
            route: '/devlog',
        }
    ]
}