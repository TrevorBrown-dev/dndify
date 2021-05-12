import { useCallback, useState } from 'react';
import { iClass, useClasses } from './classes';
import { iStatModel, iStats, useStats } from './stats';

export interface iCharacterModel {
    name: string;
    race: string;
    stats: iStatModel[];
    classes: string[];
}

export interface iCharacter {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    stats: iStats;
    classes: iClass;
    race: string;
    setRace: React.Dispatch<React.SetStateAction<string>>;
    serialize: () => iCharacterModel;
    deserialize: (char: iCharacterModel) => void;
}

export const useCharacter = (char: iCharacterModel): iCharacter => {
    const [name, setName] = useState(char.name);
    const [race, setRace] = useState(char.race);
    const classes = useClasses(char.classes);
    const stats = useStats(char.stats);

    const serialize = useCallback(() => {
        const char = {
            name,
            race,
            stats: stats.stats,
            classes: classes.classes,
        };
        return char;
    }, [name, race, classes, stats]);

    const deserialize = useCallback(
        (char: iCharacterModel) => {
            setName(char.name);
            stats.deserialize(char.stats);
            classes.deserialize(char.classes);
            setRace(char.race);
        },
        [setName, stats, classes]
    );

    const character: iCharacter = {
        name,
        setName,
        stats,
        race,
        setRace,
        classes,
        serialize,
        deserialize,
    };
    return character;
};
