import React from 'react';
import { iCharacter } from '../../models/character';
import { CheckState, TripleCheckBox, TripleCheckBoxLegend } from '../misc/TripleCheckBox';
import { Section } from './Section';

interface ProficienciesProps {
    character: iCharacter;
}

const mapProficiencies = (character: iCharacter) => {
    const padding: React.CSSProperties = { marginRight: '.5em' };
    const { proficiencies } = character.proficiencies;
    const els: JSX.Element[] = [];
    for (let key in proficiencies) {
        const { proficiencyLevel, governingSkill } = proficiencies[key];
        const gs = governingSkill ? character.stats.modifier(governingSkill) : 0;
        const mod = gs + proficiencyLevel * character.proficiency;
        const modifier = mod >= 0 ? `+${mod}` : mod;
        els.push(
            <div
                className='center-grid-justified hoverable color-primary-hover'
                key={`tpk-${key}`}
                onClick={(e) => {
                    (e.currentTarget.querySelector('.checkbox') as HTMLDivElement)?.click();
                }}
            >
                <div className='left'>
                    <div className='center-grid-justified'>
                        <div className='left'>
                            <TripleCheckBox
                                id={`tp-${key}`}
                                name={`tp-${key}`}
                                style={padding}
                                value={proficiencies[key].proficiencyLevel as unknown as CheckState}
                                setValue={(value) => {
                                    character.proficiencies.setProficiencyLevel(key, value);
                                }}
                            />
                        </div>
                        <div className='right' style={{ width: '14ch' }}>
                            <label style={{ display: 'inline-block' }} htmlFor={`tp-${key}`} onClick={(e) => e.preventDefault()}>
                                {key}
                            </label>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='center-grid-justified'>
                        <div className='left'>
                            <div className='create-proficiencies-subheader' style={{ marginRight: '.2em' }}>
                                {governingSkill?.substring(0, 3)}
                            </div>
                        </div>
                        <div className='right'>
                            <span style={{ fontSize: '.7em', userSelect: 'none' }}>({modifier})</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return els;
};

export const Skills: React.FC<ProficienciesProps> = ({ character }) => {
    return (
        <Section id='skills' title='Skills' header='Skills' icon='fas fa-plus' wikiReference='https://roll20.net/compendium/dnd5e/Ability%20Scores#toc_3'>
            <div style={{ width: '100%' }}>
                <TripleCheckBoxLegend style={{ marginBottom: '.5em' }} />
                <div className='center-content'>
                    <div className='create-sec-proficiencies'>{mapProficiencies(character)}</div>
                </div>
            </div>
        </Section>
    );
};
