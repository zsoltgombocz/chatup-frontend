import React, { FormEvent } from 'react'
import { motion as m } from 'framer-motion';
import { config } from '../../config/settingsConfig';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import RadioGroup from '../../components/RadioGroup';
import Button from '../../components/Button';
function Contact() {
    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const type = target.type.value;
        const desc = target.desc.value;
        if (type === '' || desc === '') return;

        //! MAYBE USE SOME KND OF POPUP TO SHOW SUCCESS OR ERRORS

        console.log(target.type.value);
        console.log(target.desc.value);
    }
    return (
        <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
            <h5 className={'text text-xl mb-1'}>Vedd fel velünk a kapcsolatot!</h5>
            <p className={'text mb-6 font-extralight text-justify'}>
                Amennyiben további kérdésed, ötleted vagy problémád merülne fel, keressd fel bátran a következő elérhetőségek egyikét!
            </p>

            <h5 className={'text text-xl mb-3'}>Elérhetőségek</h5>
            <p className={'text font-extralight flex flex-row gap-2 items-center mb-6'}>
                <EnvelopeIcon className={'w-5 h-5 text'} />{config.contactEmail}
            </p>

            <h5 className={'text text-xl mb-3'}>Hibajelentés</h5>
            <form method={'POST'} onSubmit={onFormSubmit} className={'w-full'}>
                <h5 className={'text font-extralight mb-3'}>Válassza ki a jelentés tipusát!</h5>
                <RadioGroup options={['Általános visszajelzés', 'Kéretlen tartalom', 'Hibabejelentés']} name={'type'} className={'mb-'} radioGap={3} />

                <h5 className={'text font-extralight mb-3'}>Fejtse ki a problémát részletesen:</h5>
                <textarea className={'textarea mb-3 w-full'} rows={4} name={'desc'}></textarea>

                <Button size={'secondary'} style={'filled'} text={'Küldés'} hugText={true} className={'m-auto'} />
            </form>
        </m.div>
    )
}

export default Contact