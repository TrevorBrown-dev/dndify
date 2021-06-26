import { useState } from 'react';
import { iCharacterModel } from './character';
/* 
    Authored by:
        Trevor Brown

    The goal of the useItems hook is to contain all of the info repated to
    a users items. This will be done by creating a robust set of interfaces for items
*/

interface RollableProperty {
    magnitude: string;
    magnitudeType?: string;
    description?: string;
}

/* 
    An item will contain the barebones set of properties needed to encapsulate everything needed to
    define a weapon. A name, description, rarity and a set of rollable properties.
*/
export enum Rarity {
    COMMON,
    UNCOMMON,
    RARE,
    VERY_RARE,
    LEGENDARY,
    ARTIFACT,
}
const MapRarity = (rarityLevel: Rarity): string => ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'][rarityLevel];

/* 
Rollable Properties:
A rollable property is an additional property added onto an item, this could be like the dice for a weapon or
some sort of effect. Defining rollable properties allows them to be automatically rolled at the click of a button

TODO: Add "+- mod" to useDice ex: + con to add constitution modifier.
*/

export interface Item {
    name: string;
    rarity?: Rarity;
    description?: string;
    cost?: string;
    weight?: string;
    weaponProps?: RollableProperty[];
}

export const useItems = (character: iCharacterModel) => {
    const [items, setItems] = useState<Item[]>([]);
};
