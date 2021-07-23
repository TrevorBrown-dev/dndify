import { useModal } from 'src/components/Modal';
import { iCharacter } from 'src/models/character';
import { iSpellModel } from 'src/models/spells';
import { mapSpellLevel } from 'src/models/spells/SpellLevel';
import { mapSpellSchool } from 'src/models/spells/SpellSchool';
import { RollablePropertyModal } from '../Items/RollablePropertyModal';

interface SpellCardProps {
    spell: iSpellModel;
    character: iCharacter;
}
export const SpellCard: React.FC<SpellCardProps> = ({ spell, character }) => {
    const { name, level, range, casting_time, component, description, duration, school, rollableProps } = spell;
    const [toggleRPModal, rpModal] = useModal(
        <>
            <RollablePropertyModal weaponProps={spell.rollableProps} character={character} />
        </>
    );

    return (
        <>
            {rpModal}
            <div className='spell-card-container'>
                <div className='spell-card-content'>
                    <div className='spell-card-header'>
                        <div id='sc-name'>
                            <h6>{name}</h6>
                        </div>
                        <div id='sc-level'>{mapSpellLevel(level)}</div>
                        <div id='sc-school'>
                            <i className={mapSpellSchool(school)}></i>
                            <span>{school}</span>
                        </div>
                        <div id='sc-range'>{range}</div>
                        <div id='sc-cast'>{casting_time}</div>
                        <div id='sc-dur'>{duration}</div>
                        <div id='sc-components'>{component}</div>
                    </div>
                    <div className='spell-card-description'>
                        <div className='description'>{description}</div>
                    </div>
                    <div className='spell-card-rollable'>
                        <div className='rollable'>
                            <i
                                className={`fas fa-dice-d20 rollable ${rollableProps.length !== 0 && 'hoverable-half color-primary-hover'}`}
                                onClick={toggleRPModal}
                                style={{
                                    color: rollableProps.length !== 0 ? 'black' : '#919191',
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
