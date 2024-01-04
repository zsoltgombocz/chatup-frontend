import { useState, ChangeEvent, KeyboardEvent, Ref } from 'react';
import { motion as m } from 'framer-motion';

interface Props {
    placeholder?: string;
    textareaRef?: Ref<HTMLTextAreaElement>,
    initialRows?: number,
    maxRows?: number,
    className?: string,
    onSend?: Function,
    rowState: [number, Function]
}

const TextArea = ({ placeholder, textareaRef, initialRows = 1, maxRows = 3, className, onSend, rowState }: Props) => {
    const [rows, setRows] = rowState;


    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textareaLineHeight = 24;

        const previousRows = event.currentTarget.rows;
        event.currentTarget.rows = initialRows; // reset number of rows in textarea 

        const currentRows = Math.floor(
            event.currentTarget.scrollHeight / textareaLineHeight
        );

        if (currentRows === previousRows) {
            event.currentTarget.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.currentTarget.rows = maxRows;
            event.currentTarget.scrollTop = event.currentTarget.scrollHeight;
        }

        setRows(currentRows < maxRows ? currentRows : maxRows);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = event.target as HTMLTextAreaElement;

        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();

            if (textarea) {
                textarea.value = textarea.value + '\n';
                setRows(rows < maxRows ? rows + 1 : maxRows);
            }
        }

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSend?.(event, textarea.value);
        }
    };

    return (
        <m.textarea
            className={`${className} chat-input`}
            ref={textareaRef}
            placeholder={placeholder}
            rows={rows}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export default TextArea;