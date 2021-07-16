import { useCallback, useState } from 'react';
import { iCharacterModel } from '../character';
import { ItemType } from './ItemType';
import { mapRarity, Rarity } from './Rarity';
/* 
    Authored by:
        Trevor Brown

    The goal of the useItems hook is to contain all of the info repated to
    a users items. This will be done by creating a robust set of interfaces for items
*/

export interface RollableProperty {
    name: string;
    magnitude: string;
    magnitudeType?: string; // ? What the fuck does this mean? - It means the damage type (fire, slashing,... etc)
}

/* 
    An item will contain the barebones set of properties needed to encapsulate everything needed to
    define a weapon. A name, description, rarity and a set of rollable properties.
*/

/* 
Rollable Properties:
A rollable property is an additional property added onto an item, this could be like the dice for a weapon or
some sort of effect. Defining rollable properties allows them to be automatically rolled at the click of a button

TODO: Add "+- mod" to useDice ex: + con to add constitution modifier.
*/
export interface Rollable {
    rollableProps: RollableProperty[];
}
export interface iItemModel extends Rollable {
    name: string;
    rarity?: Rarity;
    description?: string;
    cost?: string;
    weight?: string;
    type?: ItemType;
}

export const useItems = (character: iCharacterModel) => {
    const [items, setItems] = useState<iItemModel[]>([]);
    const addItem = useCallback(
        (item: iItemModel) => {
            setItems((items) => [...items, item]);
        },
        [setItems]
    );

    const removeItem = useCallback(
        (id: string | number) => {
            let index = typeof id === 'string' ? items.findIndex((item) => item.name === id) : id;

            setItems((items) => {
                items.splice(index, 1);
                return items;
            });
        },
        [setItems, items]
    );
    const serialize = useCallback(() => items, [items]);
    const deserialize = useCallback((items: iItemModel[]) => setItems(items), [setItems]);

    const obj = {
        items,
        addItem,
        removeItem,
        mapRarity,
        serialize,
        deserialize,
    };

    return obj;
};

export type iItems = ReturnType<typeof useItems>;
