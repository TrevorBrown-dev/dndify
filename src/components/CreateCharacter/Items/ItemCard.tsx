import { iItemModel, Rarity } from "../../../models/items";
const defaultItem: iItemModel = {
    name: "Diamond Sword",
    cost: "3gp",
    description: `
    Minecraft steve's legendary sword.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam vitae repellat facere quia maiores qui quidem cumque optio accusamus ex at blanditiis explicabo voluptas illo fuga delectus rerum, molestias distinctio!
    `,
    rarity: Rarity.ARTIFACT,
    weight: "20lbs"
}
export const ItemCard: React.FC<{ item?: iItemModel }> = ({ item }) => {
    if (!item)
        item = defaultItem;

    const { name, description, cost, rarity, weaponProps, weight } = item;
    return (
        <div className="item-card-container hoverable-half">
            <div className="item-card-content">
                <header>
                    <h4>{name}</h4>
                </header>
                <p>{description}</p>
            </div>
        </div>
    )
}