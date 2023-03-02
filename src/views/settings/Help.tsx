import { motion as m } from 'framer-motion';
import faq from '@config/FAQ.json'
import LinkButton from '@components/LinkButton';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Help = () => {
    return (
        <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
            <h5 className={'text text-xl mb-3 text-center'}>Gyakran ismételt kérdések</h5>
            {
                faq.map(qa => (
                    <div className={'mb-6'}>
                        <p className={'text mb-1'}>{qa.q}</p>
                        <p className={'text text-justify pl-2 font-extralight'}>{qa.a}</p>
                    </div>
                ))
            }
            <LinkButton linkTo={'/settings/contact'}>
                <div className={'flex flex-row gap-1 items-center'}>Segítség kérése <ChevronRightIcon className={'w-4 h-4'} /></div>
            </LinkButton>
        </m.div>
    )

}

export default Help