import { useCallback, useState } from 'react';
import { iSerializable } from './character';
export interface iClassModel {
    name: string;
    level?: number;
    hitDice?: number;
}
export interface iClass extends iSerializable<iClassModel[]> {
    classes: iClassModel[];
    addClass: (c: string) => void;
    removeClass: (c: string) => void;
    toggleClass: (c: string) => void;
    setDice: (name: string, hitDice: number) => void;
    setLevel: (name: string, level: number) => void;
    totalLevel: () => number;
    includes: (name: string) => boolean;
}

export const useClasses = (_classes: iClassModel[]): iClass => {
    //Variables
    const [classes, _setClasses] = useState<iClassModel[]>(_classes);

    const includes = useCallback((name: string) => classes.some((oc) => oc.name === name), [classes]);
    const _setClassProperty = useCallback(
        (className: string, key: keyof iClassModel, value: iClassModel[keyof iClassModel]) => {
            _setClasses((oldClasses) =>
                oldClasses.map((c) => {
                    return c.name === className ? { ...c, [key]: value } : c;
                })
            );
        },
        [_setClasses]
    );
    const setDice = useCallback((name: string, hitDice: number) => _setClassProperty(name, 'hitDice', hitDice), [_setClassProperty]);
    const setLevel = useCallback((name: string, level: number) => _setClassProperty(name, 'level', level), [_setClassProperty]);

    //Functions
    const addClass = useCallback(
        (c: string) => {
            _setClasses((oldClasses) => (!oldClasses.some((oc) => oc.name === c) ? [...oldClasses, { name: c, level: 1 }] : oldClasses));
        },
        [_setClasses]
    );
    const removeClass = useCallback(
        (c: string) => {
            _setClasses((oldClasses) => oldClasses.filter((cl) => cl.name.toLowerCase() !== c.toLowerCase()));
        },
        [_setClasses]
    );

    const deserialize = useCallback(
        (c: iClassModel[]) => {
            _setClasses(c);
        },
        [_setClasses]
    );

    const totalLevel = useCallback(() => {
        let level = 0;
        classes.forEach((c) => (level += c.level || 0));
        return level;
    }, [classes]);

    const serialize = useCallback(() => {
        console.log('SERIALIZED CLASSES', classes);
        return classes;
    }, [classes]);

    const toggleClass = useCallback(
        (c: string) => {
            if (includes(c)) {
                removeClass(c);
            } else {
                addClass(c);
            }
        },
        [includes, addClass, removeClass]
    );

    const cl: iClass = {
        classes,
        addClass,
        removeClass,
        toggleClass,
        includes,
        setDice,
        setLevel,
        totalLevel,
        serialize,
        deserialize,
    };

    return cl;
};
