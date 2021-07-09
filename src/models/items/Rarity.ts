
export enum Rarity {
    COMMON,
    UNCOMMON,
    RARE,
    VERY_RARE,
    LEGENDARY,
    ARTIFACT,
}
export const Rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];
export const mapRarity = (rarity: Rarity): string => {
    console.log("HMMM",rarity, Rarities[rarity]);
    const map = Rarities[rarity]
        return map;
};