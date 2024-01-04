import { FormEvent } from 'react'
import { motion as m } from 'framer-motion';
import Button from '@components/Button';
import { useNotify } from '@hooks/useNotify';

import { getEmbedObject } from '@utils/discord'
import SelectInput from '@components/SelectInput';
import { ToastVariant } from '@utils/enums';
const Contact = () => {
    const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WH;
    const { notify } = useNotify();

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const type = target.type.value;
        const platform = target.platform.value;
        const browser = target.browser.value;
        const desc = target.desc.value;
        if (!type || !desc || !platform || !browser) return;

        const now = new Date(Date.now());
        fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getEmbedObject(
                now,
                type,
                platform,
                browser,
                desc
            )),
        })
            .then(async result => {
                if (result.status !== 200 && result.status !== 204) {
                    const data = await result.json();
                    notify('Váratlan hiba történt!', data.message, ToastVariant.FAILED, 5000);
                } else {
                    notify('Köszönjük bejelentésed!', "Bejelentésed beérkezett rendszerünkbe.", ToastVariant.SUCCESS, 5000);
                    target.reset();
                    target.type.selectedIndex = 0;
                    target.platform.selectedIndex = 0;
                    target.browser.selectedIndex = 0;
                }
            })
            .catch((err) => {
                notify('Váratlan hiba történt!', 'Hiba történt a küldés során. Kérlek próbáld újra késöbb!', ToastVariant.FAILED, 5000);
            });
    }
    return (
        <m.div className={'scrollable-view'} initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }}>
            <h5 className={'text text-xl mb-1'}>Vedd fel velünk a kapcsolatot!</h5>
            <p className={'text mb-6 font-extralight text-justify'}>
                Amennyiben további kérdésed, ötleted vagy problémád merülne fel, keressd fel bátran a következő elérhetőségek egyikét!
            </p>
            <p className={'text mb-6 font-extralight text-justify'}>E-mail: mail@chatup.hu</p>

            <h5 className={'text text-xl mb-3'}>Hibajelentés</h5>
            <form method={'POST'} onSubmit={onFormSubmit} className={'w-full'}>

                <h5 className={'text font-extralight mb-2'}>Válaszd ki a jelentés tipusát!</h5>
                <SelectInput options={['Általános visszajelzés', 'Kéretlen tartalom', 'Hibabejelentés']} name={'type'} className={'mb-5'} />

                <h5 className={'text font-extralight mb-2'}>Válaszd ki a platformot!</h5>
                <SelectInput options={['Android', 'PC', 'iOS']} name={'platform'} className={'mb-5'} />

                <h5 className={'text font-extralight mb-2'}>Válaszd ki a böngészőt!</h5>
                <SelectInput options={['Chrome', 'Firefox', 'Opera', 'Safari', 'Brave']} name={'browser'} className={'mb-5'} />

                <h5 className={'text font-extralight mb-2'}>Fejtse ki a problémát részletesen:</h5>
                <textarea className={'textarea mb-3 w-full'} rows={4} name={'desc'}></textarea>

                <Button size={'secondary'} style={'filled'} text={'Küldés'} hugText={true} className={'m-auto'} />
            </form>
        </m.div>
    )
}

export default Contact