export enum SPELL_SCHOOL {
    NONE = '',
    ABJURATION = 'Abjuration',
    CONJURATION = 'Conjuration',
    DIVINATION = 'Divination',
    ENCHANTMENT = 'Enchantment',
    EVOCATION = 'Evocation',
    ILLUSION = 'Illusion',
    NECROMANCY = 'Necromancy',
}

export const mapSpellSchool = (school: SPELL_SCHOOL) => {
    const icons: { [key: string]: string } = {
        [SPELL_SCHOOL.NONE]: '',
        [SPELL_SCHOOL.ABJURATION]: 'fas fa-shield-cross',
        [SPELL_SCHOOL.CONJURATION]: 'fas fa-construction',
        [SPELL_SCHOOL.DIVINATION]: 'fas fa-scroll-old',
        [SPELL_SCHOOL.ENCHANTMENT]: 'fas fa-hand-sparkles',
        [SPELL_SCHOOL.EVOCATION]: 'fas fa-fire',
        [SPELL_SCHOOL.ILLUSION]: 'fas fa-smoke',
        [SPELL_SCHOOL.NECROMANCY]: 'fas fa-skull',
    };

    return icons[school];
};
