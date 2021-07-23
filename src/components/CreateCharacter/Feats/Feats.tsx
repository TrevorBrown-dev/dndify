import { useState } from 'react';
import { blankFeat } from 'src/models/feats/feats';
import { Rollable } from 'src/models/items';
import { CharacterProps } from '..';
import { RollablePropertyForm } from '../Items/RollableProperty';
import { Section } from '../Section';

export const Feats: React.FC<CharacterProps> = ({ character }) => {
    const [feat, setFeat] = useState(blankFeat);
    return (
        <Section id='features' header='Features and Traits' title='Features and Traits' icon='fas fa-diagnosis' wikiReference='https://d-n-d5e.fandom.com/wiki/Feats'>
            <div className='create-sec-feats'>
                <div className='feats-form'>
                    <h4>
                        <input type='text' value={feat.name} id='feat-name' onChange={(e) => setFeat((f) => ({ ...f, name: e.target.value }))} placeholder='Name' />
                    </h4>
                    <textarea name='feat-desc' id='feat-desc' value={feat.notes} onChange={(e) => setFeat((f) => ({ ...f, notes: e.target.value }))} placeholder='Description'></textarea>
                </div>
                <RollablePropertyForm item={feat} setItem={setFeat as React.Dispatch<React.SetStateAction<Rollable>>} />
            </div>
        </Section>
    );
};
