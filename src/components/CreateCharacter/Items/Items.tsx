import React from "react";
import { CharacterProps, Section } from "..";


/*
    The item card should take in an item object and render its details.
    
    It should be displayed in a tiled-grid form similar to a equipment card
*/
const ItemCard: React.FC = () => {
    return (
        <div>
        </div>
    );
}


export const Items: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section header="Items" id="items" title="Items" wikiReference="https://www.dndbeyond.com/equipment" icon="fas fa-swords">
            Items
        </Section>
    );
}