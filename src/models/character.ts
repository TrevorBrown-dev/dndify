import { useCallback, useState } from 'react';
import { iClass, iClassModel, useClasses } from './classes';
import { blankProficiencies, iProficiencies, iProficienciesModel, useProficiencies } from './proficiencies';
import { iSavingThrowModel, iSavingThrows, useSavingThrows } from './savingThrows';
import { iStatModel, iStats, useStats } from './stats';
export interface iSerializable<T> {
    serialize: () => T;
    deserialize: (model: T) => void;
}
//SavingThrows aren't being serialized/deserialized
export interface iCharacterModel {
    name: string;
    race: string;
    background: string;
    hp: number;
    stats: iStatModel[];
    classes: iClassModel[];
    savingThrows: iSavingThrowModel;
    proficiencies: iProficienciesModel;
    otherProficiencies: iProficienciesModel;
}
export interface iCharacter extends iSerializable<iCharacterModel> {
    name: string;
    background: string;
    hp: number;
    savingThrows: iSavingThrows;
    setHP: React.Dispatch<React.SetStateAction<number>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setBackground: React.Dispatch<React.SetStateAction<string>>;
    stats: iStats;
    classes: iClass;
    proficiencies: iProficiencies;
    otherProficiencies: iProficiencies;
    race: string;
    setRace: React.Dispatch<React.SetStateAction<string>>;
    level: number;
    proficiency: number;
}

export const blankCharacter = (): iCharacterModel => {
    const char: iCharacterModel = {
        name: '',
        race: '',
        background: '',
        hp: 0,
        stats: [
            {
                name: 'Strength',
                short_name: 'Str',
                value: 0,
            },
            {
                name: 'Dexterity',
                short_name: 'Dex',
                value: 0,
            },
            {
                name: 'Constitution',
                short_name: 'Con',
                value: 0,
            },
            {
                name: 'Intelligence',
                short_name: 'Int',
                value: 0,
            },
            {
                name: 'Wisdom',
                short_name: 'Wis',
                value: 0,
            },
            {
                name: 'Charisma',
                short_name: 'Cha',
                value: 0,
            },
        ],
        savingThrows: {},
        proficiencies: blankProficiencies(),
        otherProficiencies: {},
        classes: [],
    };

    return char;
};

export const useCharacter = (char: iCharacterModel): iCharacter => {
    const [background, setBackground] = useState(char.background);
    const [name, setName] = useState(char.name);
    const [hp, setHP] = useState(char.hp);
    const [race, setRace] = useState(char.race);
    const classes = useClasses(char.classes);
    const stats = useStats(char.stats);
    const savingThrows = useSavingThrows(char.stats);
    const proficiencies = useProficiencies(char.proficiencies);
    const otherProficiencies = useProficiencies(char.otherProficiencies);
    const _proficiency = useCallback(() => {
        return 1 + Math.ceil(classes.totalLevel() / 4);
    }, [classes]);

    const serialize = useCallback(() => {
        const char: iCharacterModel = {
            name,
            hp,
            race,
            stats: stats.stats,
            classes: classes.serialize(),
            savingThrows: savingThrows.serialize(),
            proficiencies: proficiencies.serialize(),
            otherProficiencies: otherProficiencies.serialize(),
            background,
        };
        return char;
    }, [savingThrows, name, race, hp, classes, stats, proficiencies, background, otherProficiencies]);

    const deserialize = useCallback(
        (char: iCharacterModel) => {
            setName(char.name);
            setHP(char.hp);
            stats.deserialize(char.stats);
            classes.deserialize(char.classes);
            setRace(char.race);
            savingThrows.deserialize(char.savingThrows);
            proficiencies.deserialize(char.proficiencies);
            otherProficiencies.deserialize(char.otherProficiencies);
            setBackground(char.background);
        },
        [savingThrows, otherProficiencies, proficiencies, setName, stats, classes]
    );

    const character: iCharacter = {
        name,
        hp,
        background,
        setBackground,
        setName,
        setHP,
        stats,
        race,
        savingThrows,
        get proficiency() {
            return _proficiency();
        },
        get level() {
            return classes.totalLevel();
        },
        proficiencies,
        otherProficiencies,
        setRace,
        classes,
        serialize,
        deserialize,
    };
    return character;
};
