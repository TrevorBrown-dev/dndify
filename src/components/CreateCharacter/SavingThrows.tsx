import React, { useCallback } from "react";
import { CharacterProps } from ".";
import { iCharacter } from "../../models/character";
import { CheckState, TripleCheckBox, TripleCheckBoxLegend } from "../misc/TripleCheckBox";
import { Section } from "./Section";

export const SavingThrows: React.FC<CharacterProps> = ({ character }) => {


    const renderStats = useCallback((character: iCharacter) => {
        const padding: React.CSSProperties = { marginRight: '.5em' };
        const { savingThrows } = character.savingThrows;
        const els = [];
        for (const name in savingThrows) {
            const proficiencyLevel = savingThrows[name];
            const mod = character.savingThrows.getProficiencyValue(name, character);
            const modifier = (mod >= 0) ? `+${mod}` : mod;
            els.push(
                <div className="center-grid-justified centered hoverable-half color-off-primary-hover no-select" key={`saving-throw-${name}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        (e.currentTarget.querySelector('.checkbox') as HTMLDivElement)?.click();
                    }}
                >
                    <div className="center-grid-justified">
                        <div className="left">
                            <TripleCheckBox name={name} id={`checkbox-${name}`} style={{ ...padding }}
                                value={proficiencyLevel as unknown as CheckState}

                                setValue={(value) => {
                                    character.savingThrows.setProficiencyLevel(name, value);
                                }}
                            />
                        </div>
                        <div className="right">
                            <label htmlFor={`checkbox-${name}`}>{name}</label>
                        </div>

                    </div>
                    <div className="right" style={{ marginLeft: '.2em' }}>
                        <span style={{ fontSize: ".7em" }}>({modifier})</span>
                    </div>
                </div>
            )
        }

        return els;
    }, []);

    return (
        <Section id="saving-throws" title="Saving Throws" header="Saving Throws" icon="fas fa-shield-virus" wikiReference="https://roll20.net/compendium/dnd5e/Ability%20Scores#toc_35">
            <div style={{ width: '100%' }}>
                <TripleCheckBoxLegend style={{ marginBottom: '.5em' }} />
                <div className="create-sec-saving-throws">
                    {renderStats(character)}
                </div>
            </div>
        </Section>
    );
}