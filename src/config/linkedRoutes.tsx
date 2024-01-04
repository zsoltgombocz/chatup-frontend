import { ReactElement, lazy } from "react";
import { NavigateFunction } from "react-router-dom";
const HomeView = lazy(() => import('@views/HomeView'));
const SettingsView = lazy(() => import('@views/SettingsView'));
const PrivacyView = lazy(() => import('@views/settings/Privacy'));
const CustomizeView = lazy(() => import('@views/settings/Customize'));
const InformationView = lazy(() => import('@views/settings/Information'));
const HelpView = lazy(() => import('@views/settings/Help'));
const ContactView = lazy(() => import('@views/settings/Contact'));
const DevlogView = lazy(() => import('@views/DevlogView'));
const CountySelectionView = lazy(() => import('@views/pre/CountySelectionView'));
const GenderSelectionView = lazy(() => import('@views/pre/GenderSelectionView'));
const InterestSelectionView = lazy(() => import('@views/pre/InterestSelectionView'));
const SearchView = lazy(() => import('@views/SearchView'));
const ChatView = lazy(() => import('@views/ChatView'));

interface LinkedRouteInterface {
    route: string;
    name: string;
    prev: string | null;
    view: ReactElement;
    displayName?: string | undefined;
}

export const getPreviousRoute = (route: string): LinkedRouteInterface | undefined => {
    const current = ROUTES.find(r => r.route === route);
    if (current === undefined) return undefined;

    return ROUTES.find(r => r.name === current.prev);
}

export const getRouteName = (route: string): string | undefined => {
    const routeExist = ROUTES.find(r => r.route === route);
    if (routeExist === undefined) return undefined;

    return routeExist.displayName;
}

export const ROUTES: LinkedRouteInterface[] = [
    {
        route: '/',
        name: 'index',
        prev: null,
        view: <HomeView />,
    },
    {
        route: '/settings',
        name: 'settings',
        prev: 'index',
        displayName: 'Beállítások',
        view: <SettingsView />,
    },
    {
        route: '/pre/location',
        name: 'location',
        prev: 'index',
        displayName: 'Válassz vármegyét',
        view: <CountySelectionView />,
    },
    {
        route: '/pre/gender',
        name: 'gender',
        prev: 'location',
        displayName: 'Válaszd ki a nemed',
        view: <GenderSelectionView />,
    },
    {
        route: '/pre/interest',
        name: 'interest',
        prev: 'gender',
        displayName: 'Válassz ki 3 témát',
        view: <InterestSelectionView />,
    },
    {
        route: '/settings/privacy',
        name: 'privacy',
        prev: 'settings',
        displayName: 'Adatvédelem',
        view: <PrivacyView />,
    },
    {
        route: '/settings/customize',
        name: 'customize',
        prev: 'settings',
        displayName: 'Testerszabás',
        view: <CustomizeView />,
    },
    {
        route: '/settings/devlog',
        name: 'devlog',
        prev: 'settings',
        displayName: 'Verzióelőzmények',
        view: <DevlogView />,
    },
    {
        route: '/settings/help',
        name: 'help',
        prev: 'settings',
        displayName: 'Súgó',
        view: <HelpView />,
    },
    {
        route: '/settings/contact',
        name: 'contact',
        prev: 'settings',
        displayName: 'Kapcsolatfelvétel',
        view: <ContactView />,
    },
    {
        route: '/search',
        name: 'serach',
        prev: 'interest',
        view: <SearchView />,
    },
    {
        route: '/chat',
        name: 'chat',
        prev: 'search',
        view: <ChatView />,
    }
]