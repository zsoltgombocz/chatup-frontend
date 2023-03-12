import { Bars3Icon } from "@heroicons/react/24/outline"
import { menuElementInterface } from "@utils/interfaces/menuElementInterface"
import { useState, forwardRef } from 'react';
import { motion as m } from 'framer-motion';
import { Ref } from "react";
type Props = {
    menuElements: menuElementInterface[],
    className?: string,
}

const container = {
    hidden: {
        opacity: 0,
        display: 'none',
        transition: {
            staggerChildren: 0.2,
            when: "afterChildren"
        },
    },
    show: {
        opacity: 1,
        display: 'flex',
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1
        }
    }
};

const listItem = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0 }
};

interface inlineMenuElementInterface extends menuElementInterface {
    isOpen?: boolean,
}

const InlineMenu = forwardRef(({ className, menuElements }: Props, ref: Ref<HTMLDivElement>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [elements, setElements] = useState<inlineMenuElementInterface[]>(
        menuElements.map(element => ({ ...element, isOpen: false })).sort((a, b) => a.order - b.order)
    );

    const onElementClick = (element: inlineMenuElementInterface) => {
        element.isOpen = !element.isOpen;
        setElements(
            [...elements.filter(e => e.name !== element.name), element].sort((a, b) => a.order - b.order)
        );

        element.onClick?.();
    }

    return (
        <div className={`${className} flex flex-row gap-3`} ref={ref}>
            <m.div
                className={'flex flex-row gap-3 ml-3'}
                initial="hidden" animate={open ? 'show' : 'hidden'} variants={container}
            >
                {elements?.map(element => (
                    <m.div
                        key={element.name}
                        variants={listItem}
                        onClick={() => onElementClick(element)}>
                        {element.isOpen ? element.openIcon || element.icon : element.icon}
                    </m.div>
                ))}
            </m.div>
            <Bars3Icon className={'w-8 h-8 text cursor-pointer'} onClick={() => setOpen(prev => !prev)} />
        </div >
    )
})

export default InlineMenu