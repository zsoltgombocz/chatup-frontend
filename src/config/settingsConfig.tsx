import {
    EnvelopeIcon,
    FingerPrintIcon,
    MoonIcon,
    PencilIcon,
    QuestionMarkCircleIcon,
    SunIcon,
    UserIcon
} from "@heroicons/react/24/outline";
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
    index: number
}
interface SettingsConfigInterface {
    categories: CategoryInterface[];
    themes: ThemeInterface[],
    colors: string[],
    privacySwitches: PrivacySwitchInterface[] | [],
    informationLinks: CategoryInterface[],
    contactEmail: string,
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
            display: 'GY.I.K.',
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
    colors: ['red', 'blue'],
    privacySwitches: [
        {
            text: 'Linkek küldése',
            index: 0,
        }, {
            text: 'Képek / Videók küldése',
            index: 1,
        }, {
            text: 'Aktivitási állapot megjelenítése',
            index: 2,
        }, {
            text: 'Elérhetőség jelzése (AFK)',
            index: 3,
        }, {
            text: 'Live-feedback követése',
            index: 4,
        }, {
            text: 'Felhasználói adatok gyűjtése',
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
            display: 'Felhasználói útmutató',
            route: '/information/guide',
        },
        {
            name: 'devlog',
            display: 'Development Log',
            route: '/devlog',
        }
    ],
    contactEmail: 'info@chatup.hu',
}