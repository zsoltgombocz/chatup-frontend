import Logo from '@atoms/Logo';
import { motion as m } from 'framer-motion';

const NotFound = () => {
    return (
        <m.div className={'scrollable-view'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
            <h1 className={'text text-2xl mb-5 mx-auto text-center'}>Sajnáljuk de a keresett oldal nem található!</h1>
            <Logo size={'sm'} />
            <div className={'text mt-7'}>
                Ezt okozhatja hogy nem létező oldalra akart navigálni vagy nem megfelelő
                a kapcsolat a szerverrel. Utóbbi miatt elnézését kérjük, dolgozunk a problémán.
            </div>
        </m.div>
    );
}

export default NotFound;