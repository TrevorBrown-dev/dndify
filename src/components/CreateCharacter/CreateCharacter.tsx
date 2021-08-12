import React, { useEffect } from 'react';
import { DiceSidebar } from '../DiceSidebar/';
import { CharacterProps, Class, CreateSidebar, Header, Health, HitDice, Race } from './';
import { Alignment } from './Alignment';
import { Background } from './Background';
import { Backstory } from './Backstory';
import { CharacterDescription } from './CharacterDescription';
import { Feats } from './Feats';
import { Items } from './Items';
import { OtherProficiencies } from './OtherProficiencies';
import { SavingThrows } from './SavingThrows';
import { Skills } from './Skills';
import { Spells } from './Spells';

export const CreateCharacter: React.FC<CharacterProps> = ({ character }) => {
    /* 
    Render the stats
    Create inputs for the stats,
    create a button to roll the stats automatically
    Save button
  */
    useEffect(() => {
        document.querySelectorAll('input').forEach((input) => {
            input.setAttribute('autocomplete', 'nope');
            input.setAttribute('autofill', 'nope');
        });
    }, []);
    const handleDrop: React.DragEventHandler<HTMLElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            const file = event.dataTransfer.files[0];
            const read = new FileReader();

            read.readAsBinaryString(file);

            read.onloadend = function () {
                if (typeof read.result === 'string') {
                    const char = JSON.parse(read.result);
                    character.deserialize(char);
                }
            };
        } catch (e) {
            console.log('Invalid file dropped!');
        }
    };
    const handleDrag: React.DragEventHandler<HTMLElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <>
            <CreateSidebar character={character} />
            <main className='page-main' onDrop={handleDrop} onDragOver={handleDrag}>
                <div className='create-character'>
                    <Header character={character} />
                    <div className='create-main'>
                        <Race character={character} />
                        <Alignment character={character} />
                        <Background character={character} />
                        <Class character={character} />
                        <HitDice character={character} />
                        <Health character={character} />
                        <SavingThrows character={character} />
                        <Skills character={character} />
                        <Feats character={character} />
                        <Items character={character} />
                        <Spells character={character} />
                        <OtherProficiencies character={character} />
                        <CharacterDescription character={character} />
                        <Backstory character={character} />
                    </div>
                </div>
            </main>
            <DiceSidebar character={character} />
            {/* <MiniStats character={character} /> */}
        </>
    );
};
