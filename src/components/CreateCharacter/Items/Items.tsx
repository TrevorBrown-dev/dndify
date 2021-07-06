import React from 'react';
import { CharacterProps, Section } from '..';
import { ItemType } from '../../../models/items';
import { ItemCard } from './ItemCard';

/*
    The item card should take in an item object and render its details.
    
    It should be displayed in a tiled-grid form similar to a equipment card
*/

const mapItemTypes = (): JSX.Element[] => {
    const els: JSX.Element[] = [];
    const vals = Object.values(ItemType);

    for (const key of vals) {
        els.push(
            <option key={key} defaultValue={key}>
                {key}
            </option>
        );
    }
    return els;
};

const SelectItemType: React.FC = () => {
    return (
        <select
            name="item-type"
            id="item-type"
            style={{ width: '100%', height: '100%' }}>
            <option selected defaultValue="" style={{ color: 'darkgray' }}>
                Chose a Type...
            </option>
            {mapItemTypes()}
        </select>
    );
};

export const Items: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section
            header="Items"
            id="items"
            title="Items"
            wikiReference="https://www.dndbeyond.com/equipment"
            icon="fas fa-swords">
            <div className="create-sec-items">
                <div className="item-form">
                    <div id="name">
                        <h3>
                            <input
                                type="text"
                                id="item-name"
                                placeholder="Name"
                            />
                        </h3>
                    </div>
                    <div id="rarity">rarity</div>
                    <div id="type">
                        <SelectItemType />
                    </div>
                    <div id="weight">weight</div>
                    <div id="cost">cost</div>
                    <div id="desc">description</div>
                    <div id="submit">
                        <button className="add-item">Add Item</button>
                    </div>
                </div>
                <fieldset className="item-cards">
                    <legend>Items</legend>
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                </fieldset>
            </div>
        </Section>
    );
};
