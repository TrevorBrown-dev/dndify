export enum SPELL_LEVEL {
    CANTRIP,
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH,
    EIGHTH,
    NINTH,
}
export const mapSpellLevel = (level: SPELL_LEVEL): string => {
    const map: { [key: number]: string } = {
        [SPELL_LEVEL.CANTRIP]: 'Cantrip',
        [SPELL_LEVEL.FIRST]: '1st',
        [SPELL_LEVEL.SECOND]: '2nd',
        [SPELL_LEVEL.THIRD]: '3rd',
        [SPELL_LEVEL.FOURTH]: '4th',
        [SPELL_LEVEL.FIFTH]: '5th',
        [SPELL_LEVEL.SIXTH]: '6th',
        [SPELL_LEVEL.SEVENTH]: '7th',
        [SPELL_LEVEL.EIGHTH]: '8th',
        [SPELL_LEVEL.NINTH]: '9th',
    };

    return map[level];
};
