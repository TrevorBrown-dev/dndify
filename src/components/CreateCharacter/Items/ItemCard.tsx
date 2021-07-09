import { iItemModel } from '../../../models/items/items';
import { mapItemType, ItemType } from '../../../models/items/ItemType';
import { Rarity, mapRarity } from '../../../models/items/Rarity';
const defaultItem: iItemModel = {
    name: 'Diamond Sword',
    cost: '3gp',
    description: `
    Minecraft steve's legendary sword.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam vitae repellat facere quia maiores qui quidem cumque optio accusamus ex at blanditiis explicabo voluptas illo fuga delectus rerum, molestias distinctio!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sequi, dolor quis in distinctio quia odit dolores saepe error est.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sequi, dolor quis in distinctio quia odit dolores saepe error est.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sequi, dolor quis in distinctio quia odit dolores saepe error est.
    `,
    rarity: Rarity.ARTIFACT,
    weight: '20lbs',
    
};
export const ItemCard: React.FC<{ item?: iItemModel }> = ({
    item = defaultItem,
}) => {
    let { name, description, cost, rarity, type, weaponProps, weight } = item;
    weaponProps = [];
    weaponProps.push({
        name: 'Attack',
        magnitude: '2d4',

    });
    const colors = [
        '#3f3f3f',
        '#0a9900',
        '#0070dd',
        '#a335ee',
        '#ff8000',
        '#ee3333',
    ];
    return (
        <div className="item-card-container">
            <div className="item-card-content">
                <header className="header">
                    <h4 className="name">{name}</h4>
                    <h5
                        className="rarity"
                        style={{
                            color: colors[rarity || 0],
                        }}>
                        <em>{mapRarity(rarity || Rarity.COMMON)}</em>
                        <span className="weight">{weight}</span>
                    </h5>
                    <i
                        className={`${
                            mapItemType(type || ItemType.WEAPON).icon
                        } icon`}></i>
                </header>
                <div style={{ textAlign: 'center' }}>{cost}</div>
                <div className="description">{description}</div>
                <div>
                    <i
                        className={`fas fa-dice-d20 rollable ${
                            weaponProps && 'hoverable-half color-primary-hover'
                        }`}
                        style={{
                            color: weaponProps ? 'black' : '#919191',
                        }}></i>
                </div>
            </div>
        </div>
    );
};
