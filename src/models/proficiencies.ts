import { serialize } from 'node:v8';
import { useCallback, useState } from 'react';
import { iCharacter, iSerializable } from './character';
import { ProficiencyLevels } from './savingThrows';
export const blankProficiencies = () => {
    const names: iProficienciesModel = {
        Acrobatics: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Dexterity',
        },
        'Animal Handling': {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Wisdom',
        },
        Arcana: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Intelligence',
        },
        Athletics: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Strength',
        },
        Deception: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Charisma',
        },
        History: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Intelligence',
        },
        Insight: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Wisdom',
        },
        Intimidation: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Charisma',
        },
        Investigation: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Intelligence',
        },
        Medicine: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Wisdom',
        },
        Nature: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Intelligence',
        },
        Perception: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Wisdom',
        },
        Performance: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Charisma',
        },
        Persuasion: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Charisma',
        },
        Religion: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Intelligence',
        },
        'Sleight of Hand': {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Dexterity',
        },
        Stealth: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Dexterity',
        },
        Survival: {
            proficiencyLevel: ProficiencyLevels.none,
            governingSkill: 'Wisdom',
        },
    };
    return names;
};

export interface iProficienciesModel {
    [key: string]: {
        proficiencyLevel: ProficiencyLevels;
        governingSkill: string;
    };
}

export interface iProficiencies extends iSerializable<iProficienciesModel> {
    proficiencies: iProficienciesModel;
    setProficiencyLevel: (key: keyof iProficienciesModel, value: ProficiencyLevels) => void;
}
export const useProficiencies = (profs: iProficienciesModel = blankProficiencies()) => {
    const [proficiencies, _setProficiencies] = useState<iProficienciesModel>(profs);
    const getModifier = useCallback(
        (key: keyof iProficienciesModel, character: iCharacter): number => {
            const { proficiencyLevel, governingSkill } = proficiencies[key];
            const { proficiency } = character;
            const statModifier = character.stats.modifier(governingSkill);

            return statModifier + proficiencyLevel * proficiency;
        },
        [proficiencies]
    );

    const setProficiencyLevel = useCallback(
        (key: keyof iProficienciesModel, value: ProficiencyLevels) => {
            _setProficiencies((profs) => {
                return {
                    ...profs,
                    [key]: {
                        ...profs[key],
                        proficiencyLevel: value,
                    },
                };
            });
        },
        [_setProficiencies]
    );
    const serialize = useCallback(() => proficiencies, [proficiencies]);
    const deserialize = useCallback((incomingProficiencies: iProficienciesModel) => _setProficiencies(incomingProficiencies), [_setProficiencies]);

    const exportedProficiencies: iProficiencies = {
        proficiencies,
        setProficiencyLevel,
        serialize,
        deserialize,
    };
    return exportedProficiencies;
};
