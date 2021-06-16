import { CharacterProps } from "../CreateCharacter";
import { Dice } from "../Dice";
import { SaveUploadCharacter } from "../SaveUploadCharacter";

export const LoadCharacter: React.FC<CharacterProps> = ({ character }) => {

    return (
        <>
            <div>
                <SaveUploadCharacter character={ character }/>
        </div>
            <main className="page-main">
                <div className="load-page-container">
                    <header className="load-header">
                        <h1>{character.name}</h1>
                        <div className="flex"><i className="fa fa-heart"></i> {character.hp}</div>
                        <Dice />
                    </header>  
                </div>
            </main>
        </>
    );
    
}