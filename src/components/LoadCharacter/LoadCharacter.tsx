import { useDice } from "../../models/dice/dice";
import { CharacterProps } from "../CreateCharacter";
import { SaveUploadCharacter } from "../SaveUploadCharacter";

export const LoadCharacter: React.FC<CharacterProps> = ({ character }) => {
    const { roll, DiceRoller } = useDice(character);
    return (
        <>
            <div>
                <SaveUploadCharacter character={ character }/>
        </div>
            <main className="page-main" style={{gridColumn: "2/-1"}}>
                <div className="load-page-container">
                    {/* 
                        I need to design this page properly. It should be
                        streamlined in such a way that the information is
                        interactive, easy to read, and easily accessible.
                    */}

                    <header className="load-header">
                        <h1>{character.name}</h1>
                        <div className="flex"><i className="fa fa-heart"></i> {character.hp}</div>
                        
                    </header>  
                    <DiceRoller character={ character }/>
                </div>
            </main>
        </>
    );
    
}