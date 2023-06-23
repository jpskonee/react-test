import { message } from 'antd';
import { ReactNode } from 'react';


interface PushToastTypes {
    content: string | ReactNode;
    type: 'info' | 'success' | 'warning' | 'error' | 'loading';
    className?: string;
    duration?: number;
    key?: string | number;
    style?: object;
    top?: number;
    prefixCls?: string;
    onClose?: () => void;
    onClick?: () => void;
    clearPrev?: boolean;
}

export function pushToast({ type, duration = 3, clearPrev = true, ...res }: PushToastTypes) {
    clearPrev && message.destroy()
    let newDuration = duration
    if (type === 'loading') newDuration = 0
    return message[type]({ ...res, duration: newDuration });
}