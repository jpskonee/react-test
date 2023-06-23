import { useState } from 'react';

export enum stepEnum {
    prev = 'prev',
    next = 'next'
}

/**
 * This is hook is used for stepper navigations. It iterates through the array length without going off the index.
 * @returns { current , moveTab };
 */
export const UseStepperHook = (items: any[]) => {
    const totalItem = items.length;
    const [current, setCurrent] = useState(0);

    const moveStep = (dir: stepEnum | number) => {
        switch (dir) {
            case stepEnum.prev:
                if ((current - 1) % totalItem < 0) return setCurrent(totalItem - 1);
                setCurrent((current - 1) % totalItem);
                break;
            case stepEnum.next:
                setCurrent((current + 1) % totalItem);
                break;
        }
        if (typeof dir === 'number') setCurrent(dir);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return { current, moveStep };
};