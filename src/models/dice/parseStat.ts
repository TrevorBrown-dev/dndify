import { iCharacter } from "../character";

export const parseStat = (stat: string, character: iCharacter) => {
    return character.stats.modifier(stat);
}