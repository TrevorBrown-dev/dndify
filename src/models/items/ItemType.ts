export enum ItemType {
    WEAPON,
    ARMOR,
    AMMUNITION,
    TOOL,
    POISON,
    POTION,
    AVENTURING_GEAR,
    GEMSTONE,
    HOLY_SYMBOL,
    ARCANE_FOCUS,
    DRUIDIC_FOCUS,
    MOUNT,
    VEHICLE,
    EQUIPMENT_PACK,
}

//TODO: Map ItemType to FontAwesome icon.
interface ItemTypeDetails {
    name: string,
    icon: string
}
export const ItemTypes: ItemTypeDetails[] = [
        {
            name:"Weapon",
            icon: "fas fa-sword"
        },
        {
            name: "Armor",
            icon: "fas fa-helmet-battle",
        },
        {
            name: "Ammunition",
            icon: "fas fa-bow-arrow"
        },
        {
            name: "Tool",    
            icon: "fas fa-hammer",
        },
        {
            name: "Poison",
            icon: "fas fa-flask-poison",
        },
        {
            name: "Potion",
            icon: "fas fa-flask-potion",
        },
        {
            name: "Adventuring Gear",
            icon: "fas fa-cog",

        },
        {
            name: "Gemstone",
            icon: "fas fa-gem",

        },
        {
            name: "Holy Symbol",
            icon: "fas fa-cross",
        },
        {
            name: "Arcane Focus",
            icon: "fas fa-hand-holding-magic"
        },
        {
            name: "Druidic Focus",
            icon: "fas fa-acorn",
        },
        {
            name: "Mount",
            icon: "fas fa-horse-head",

        },
        {
            name: "Vehicle",
            icon: "far fa-wagon-covered",

        },
        {
            name: "Equipment Pack",
            icon: "fas fa-sack"
        }
    ];
export const mapItemType = (itemType: ItemType): ItemTypeDetails => {
    return ItemTypes[itemType];
};