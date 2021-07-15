import { string } from "mathjs"
import { useCallback, useState } from "react";
import { RollableProperty } from "../items";

export enum SPELL_LEVEL {
    CANTRIP,
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH,
    EIGHTH,
    NINTH

}
/**
 * This is the schema for a single spell
 */

export interface iSpellModel {
    name: string;
    level: SPELL_LEVEL;
    school: string;
    casting_time: string;
    range: string;
    component: string;
    duration: string;
    description: string;
    spellProps: RollableProperty[]

}

/**
 * From now on I shouldn't use optional properties, it gets too confusing
 * Every interface will come with a blank version so there is always a default value
 * for everything
 */
export const blankSpell: iSpellModel = {
    name: '',
    level: SPELL_LEVEL.CANTRIP,
    school: '',
    casting_time: '',
    range: '',
    component: '',
    duration: '',
    description: '',
    spellProps: []
}



/**
 * A template of an array for spells. The array should have exactly 10 indicies in the first direction
 * Each index in the first direction represents the level of the spell.
 * 
 * [...cantrips],[...first],[...second],[...third],[...fourth],[...fifth],[...sixth],[...seventh],[...eighth],[...ninth]
 * 
 * @type {iSpellModel[][]}
 */
export const blankSpells: iSpellModel[][] = [[], [], [], [], [], [], [], [], [], []]

/**
 * 
 * @param incomingSpells {iSpellModel[][]} The array of spells to be deserialized
 */
export const useSpells = (incomingSpells: iSpellModel[][] = blankSpells) => {
    const [spells, setSpells] = useState(incomingSpells);

    const addSpell = useCallback((spell: iSpellModel) => setSpells(s => {
        s[spell.level].push(spell);
        return s;
    }), [setSpells])

    const removeSpell = useCallback((coords: [number, number]) => {
        const [x, y] = coords;
        setSpells(spells => {
            spells[x].splice(y, 1);
            return spells;
        })
    }, [setSpells])

    const serialize = useCallback(() => spells, [spells]);
    const deserialize = useCallback((spells: iSpellModel[][]) => setSpells(spells), [setSpells]);

    //Build the object and return it.
    const obj = {
        spells,
        addSpell,
        removeSpell,
        serialize,
        deserialize
    }
    return obj;
}


export type iSpells = ReturnType<typeof useSpells>;
