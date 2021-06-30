import { useCallback, useState } from 'react';
import { iCharacterModel, iSerializable } from './character';
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
const mapRarity = (rarityLevel: Rarity): string => ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'][rarityLevel];

/* 
Rollable Properties:
A rollable property is an additional property added onto an item, this could be like the dice for a weapon or
some sort of effect. Defining rollable properties allows them to be automatically rolled at the click of a button

TODO: Add "+- mod" to useDice ex: + con to add constitution modifier.
*/

export interface iItemModel {
    name: string;
    rarity?: Rarity;
    description?: string;
    cost?: string;
    weight?: string;
    weaponProps?: RollableProperty[];
}
export type iItems = ReturnType<typeof useItems> & iSerializable<iItemModel>;



export const useItems = (character: iCharacterModel) => {
    const [items, setItems] = useState<iItemModel[]>([]);
    const addItem = useCallback((item: iItemModel) => {
        setItems((items) => [...items, item]);
    }, [setItems])

    const removeItem = useCallback((id: string | number) => {
        let index = (typeof id === "string") ?
            items.findIndex((item) => item.name === id)
            : id;
        
        setItems((items) => {
                items.splice(index, 1);
                return items;
            })
    }, [setItems])


    const serialize = useCallback(() => items, [items]);
    const deserialize = useCallback((items: iItemModel[]) => setItems(items), [setItems]);


    const obj = {
        items,
        addItem,
        removeItem,
        mapRarity,
        serialize,
        deserialize

    }
    
    return obj;
};
