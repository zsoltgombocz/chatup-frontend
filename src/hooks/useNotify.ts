import { useToastStore } from '@store/toastStore';
import { ToastVariant } from '@utils/enums';

interface useNotifyInterface {
    notify: (text: string, title: string, type?: ToastVariant, hideAfter?: number) => void,
    hide: () => void,
}

export const useNotify = (): useNotifyInterface => {
    const { show, hide } = useToastStore();
    const notify = (title: string, text: string, type: ToastVariant = ToastVariant.DEFAULT, hideAfter?: number) => {
        show(title, text, type, hideAfter);
    }

    return { notify, hide };
}