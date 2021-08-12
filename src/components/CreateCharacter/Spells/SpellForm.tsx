import { e } from 'mathjs';
import { SetStateAction } from 'react';
import { iSpellModel } from 'src/models/spells';
import { mapSpellLevel, SPELL_LEVEL } from 'src/models/spells/SpellLevel';
import { SPELL_SCHOOL } from 'src/models/spells/SpellSchool';

const SelectLevel: React.FC<SpellFormProps & { value: string }> = ({ value, setSpell }) => {
    const mapOptions = () => {
        const levels: string[] = [];
        const keys = Object.keys(SPELL_LEVEL);
        keys.splice(0, keys.length / 2);
        for (const level in keys) {
            levels.push(mapSpellLevel(parseInt(level)));
        }

        return levels.map((level, index) => {
            return (
                <option value={index as SPELL_LEVEL} key={index}>
                    {level}
                </option>
            );
        });
    };
    return (
        <select name='spell-level' id='sf-level' defaultValue={value} onChange={(e) => setSpell((spell) => ({ ...spell, level: parseInt(e.target.value) }))}>
            <option value=''>Chose a level...</option>
            {mapOptions()}
        </select>
    );
};
const SelectSchool: React.FC<SpellFormProps & { value: string }> = ({ value, setSpell }) => {
    const mapOptions = () => {
        const levels: string[] = Object.keys(SPELL_SCHOOL);
        levels.shift();

        return levels.map((level, index) => {
            const l = level.substring(0, 1).toUpperCase() + level.substring(1).toLowerCase();
            return (
                <option value={level} key={index}>
                    {l}
                </option>
            );
        });
    };
    return (
        <select name='spell-school' id='sf-school' defaultValue={value} onChange={(e) => setSpell((spell) => ({ ...spell, school: e.target.value as SPELL_SCHOOL }))}>
            <option value=''>Chose a school...</option>
            {mapOptions()}
        </select>
    );
};
interface SpellFormProps {
    setSpell: React.Dispatch<SetStateAction<iSpellModel>>;
}
export const SpellForm: React.FC<SpellFormProps & { spell: iSpellModel }> = ({ spell, setSpell }) => {
    return (
        <div className='spell-form'>
            <h3 id='sf-name'>
                <input type='text' placeholder='Name' value={spell.name} onChange={(e) => setSpell((spell) => ({ ...spell, name: e.target.value }))} />
            </h3>
            <SelectLevel setSpell={setSpell} value={spell.level + ''} /> <SelectSchool value={spell.school} setSpell={setSpell} />
            <input type='text' id='sf-casting-time' placeholder='Casting Time' value={spell.casting_time} onChange={(e) => setSpell((spell) => ({ ...spell, casting_time: e.target.value }))} />
            <input type='text' id='sf-range' placeholder='Range' value={spell.range} onChange={(e) => setSpell((spell) => ({ ...spell, range: e.target.value }))} />
            <input type='text' id='sf-component' placeholder='Component' value={spell.component} onChange={(e) => setSpell((spell) => ({ ...spell, component: e.target.value }))} />
            <input type='text' id='sf-duration' placeholder='Duration' value={spell.duration} onChange={(e) => setSpell((spell) => ({ ...spell, duration: e.target.value }))} />
            <textarea
                name='sf-description'
                id='sf-description'
                value={spell.description}
                placeholder='Description'
                onChange={(e) => setSpell((spell) => ({ ...spell, description: e.target.value }))}
                style={{ padding: '1em' }}
            ></textarea>
        </div>
    );
};
