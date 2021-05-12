import { useCallback, useState } from 'react';
export interface iClass {
    classes: string[];
    addClass: (c: string) => void;
    removeClass: (c: string) => void;
    toggleClass: (c: string) => void;
    deserialize: (c: string[]) => void;
}
export const useClasses = (_classes: string[]) => {
    const [classes, _setClasses] = useState(_classes);
    const addClass = useCallback(
        (c: string) => {
            _setClasses((oldClasses) => (!oldClasses.includes(c) ? [...oldClasses, c] : oldClasses));
        },
        [_setClasses]
    );
    const removeClass = useCallback(
        (c: string) => {
            _setClasses((oldClasses) => oldClasses.filter((cl) => cl.toLowerCase() !== c.toLowerCase()));
        },
        [_setClasses]
    );

    const deserialize = useCallback(
        (c: string[]) => {
            _setClasses(c);
        },
        [_setClasses]
    );

    const toggleClass = useCallback(
        (c: string) => {
            if (classes.includes(c)) {
                removeClass(c);
            } else {
                addClass(c);
            }
        },
        [classes, addClass, removeClass]
    );

    const cl: iClass = {
        classes,
        addClass,
        removeClass,
        toggleClass,
        deserialize,
    };

    return cl;
};
