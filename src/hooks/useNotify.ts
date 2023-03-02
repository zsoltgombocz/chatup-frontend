import { useToastStore } from '@store/toastStore';

interface useNotifyInterface {
    notify: (text: string, title: string, hideAfter?: number) => void,
    hide: () => void,
}

export const useNotify = (): useNotifyInterface => {
    const { show, hide } = useToastStore();
    const notify = (title: string, text: string, hideAfter?: number) => {
        show(title, text, hideAfter);
    }

    return { notify, hide };
}