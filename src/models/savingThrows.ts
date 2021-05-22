import { useCallback, useState } from 'react';
import { iCharacter, iSerializable } from './character';
import { iStatModel } from './stats';
export enum ProficiencyLevels {
    none = 0,
    single = 1,
    double = 2,
}

export interface iSavingThrowModel {
    [key: string]: ProficiencyLevels;
}

export interface iSavingThrows extends iSerializable<iSavingThrowModel> {
    savingThrows: iSavingThrowModel;
    setProficiencyLevel: (name: string, proficiencyLevel: ProficiencyLevels) => void;
    getProficiencyLevel: (name: string) => ProficiencyLevels;
    getProficiencyValue: (name: string, character: iCharacter) => number;
}

export const useSavingThrows = (stats: iStatModel[]): iSavingThrows => {
    const incoming: iSavingThrowModel = {};
    stats.forEach((stat) => {
        incoming[stat.name] = 0;
    });
    //Variables
    const [savingThrows, _setSavingThrows] = useState<iSavingThrowModel>(incoming);

    //Functions
    const setProficiencyLevel = useCallback(
        (name: string, proficiencyLevel: ProficiencyLevels) => {
            _setSavingThrows((oldSavingThrows) => {
                return { ...oldSavingThrows, [name]: proficiencyLevel };
            });
        },
        [_setSavingThrows]
    );

    const getProficiencyLevel = useCallback(
        (name: keyof iSavingThrowModel): ProficiencyLevels => {
            let found;
            if (savingThrows !== undefined) found = savingThrows[name];
            return found || ProficiencyLevels.none;
        },
        [savingThrows]
    );

    const getProficiencyValue = useCallback(
        (name: string, character: iCharacter) => {
            const { stats, proficiency } = character;
            const statFound = stats.modifier(name);
            return statFound + proficiency * getProficiencyLevel(name);
        },
        [getProficiencyLevel]
    );

    //Serialization
    const serialize = useCallback(() => savingThrows, [savingThrows]);
    const deserialize = useCallback(
        (incomingSavingThrows: iSavingThrowModel) => {
            _setSavingThrows((oldThrows) => ({ ...oldThrows, ...incomingSavingThrows }));
        },
        [_setSavingThrows]
    );

    //Assemble Object
    const outputSavingThrows: iSavingThrows = {
        savingThrows,
        setProficiencyLevel,
        getProficiencyLevel,
        getProficiencyValue,
        serialize,
        deserialize,
    };

    return outputSavingThrows;
};
