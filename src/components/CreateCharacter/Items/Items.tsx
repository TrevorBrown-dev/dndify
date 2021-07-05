import React from "react";
import { CharacterProps, Section } from "..";
import { ItemType } from "../../../models/items";
import { ItemCard } from "./ItemCard";


/*
    The item card should take in an item object and render its details.
    
    It should be displayed in a tiled-grid form similar to a equipment card
*/



const mapItemTypes = (): JSX.Element[] => {
    const els: JSX.Element[] = [];
    const vals = Object.values(ItemType);

    for (const key of vals) {
        els.push(<option key={key} value={key}>
            {key}
        </option>)
    }
    return els;
}

const SelectItemType: React.FC = () => {
    return (
        <div className="center-grid-justified" style={{columnGap:"0.5em"}}>
            <div className="left">
                
                <label htmlFor="item-type">Item Type: </label>
            </div>
            <div className="right">

                <select name="item-type" id="item-type">
                <option selected value="" style={{color: "darkgray"}}>Chose a Type...</option>
                    {mapItemTypes()}
                </select>
            </div>
        </div>
)
}

const InputName: React.FC = () => {
    return (
        <div className="center-grid-justified">
            <div className="left">

            <label htmlFor="item-name">Name: </label>

            </div>
            <div className="right"><input type="text" id="item-name" /></div>
        </div>
    );
}


export const Items: React.FC<CharacterProps> = ({ character }) => {

    return (
        <Section header="Items" id="items" title="Items" wikiReference="https://www.dndbeyond.com/equipment" icon="fas fa-swords">
            <div className="create-sec-items">
                <div className="item-form">

            <InputName />
         <SelectItemType />
                </div>
                <fieldset className="item-cards">
                    <legend>Items</legend>
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                </fieldset>
          </div>
        </Section>
    );
}