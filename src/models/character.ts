import { useCallback, useState } from 'react';
import { iClass, iClassModel, useClasses } from './classes';
import { blankProficiencies, iProficiencies, iProficienciesModel, useProficiencies } from './proficiencies';
import { iSavingThrowModel, iSavingThrows, useSavingThrows } from './savingThrows';
import { iStatModel, iStats, useStats } from './stats';
export interface iSerializable<T> {
    serialize: () => T;
    deserialize: (model: T) => void;
}

interface Description {
    age: string;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
}

const blankDescription = (): Description => ({
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
});

export interface iCharacterModel {
    name: string;
    race: string;
    background: string;
    alignment: string;
    backstory: string;
    description: Description;
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
    alignment: string;
    backstory: string;
    hp: number;
    savingThrows: iSavingThrows;
    description: Description;
    setDescription: React.Dispatch<React.SetStateAction<Description>>;

    setHP: React.Dispatch<React.SetStateAction<number>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setBackground: React.Dispatch<React.SetStateAction<string>>;
    setBackstory: React.Dispatch<React.SetStateAction<string>>;
    setAlignment: React.Dispatch<React.SetStateAction<string>>;
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
        alignment: '',
        backstory: '',
        description: blankDescription(),
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
    const [backstory, setBackstory] = useState(char.backstory);
    const [alignment, setAlignment] = useState(char.alignment);
    const [description, setDescription] = useState(char.description);
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
            alignment,
            backstory,
            description,
            stats: stats.stats,
            classes: classes.serialize(),
            savingThrows: savingThrows.serialize(),
            proficiencies: proficiencies.serialize(),
            otherProficiencies: otherProficiencies.serialize(),
            background,
        };
        return char;
    }, [savingThrows, name, description, race, hp, classes, stats, proficiencies, background, otherProficiencies, alignment, backstory]);

    const deserialize = useCallback(
        (char: iCharacterModel) => {
            setName(char.name);
            setHP(char.hp);
            setAlignment(char.alignment);
            stats.deserialize(char.stats);
            classes.deserialize(char.classes);
            setRace(char.race);
            setDescription(char.description);
            setBackstory(char.backstory);
            savingThrows.deserialize(char.savingThrows);
            proficiencies.deserialize(char.proficiencies);
            otherProficiencies.deserialize(char.otherProficiencies);
            setBackground(char.background);
        },
        [savingThrows, otherProficiencies, proficiencies, setName, stats, classes, setDescription, setAlignment, setBackstory]
    );

    const character: iCharacter = {
        name,
        hp,
        alignment,
        background,
        backstory,
        description,
        setDescription,
        setBackstory,
        setBackground,
        setAlignment,
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
