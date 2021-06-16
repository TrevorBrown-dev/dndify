import { CharacterProps } from "../CreateCharacter";
import { SaveUploadCharacter } from "../SaveUploadCharacter";

export const LoadCharacter: React.FC<CharacterProps> = ({ character }) => {
    return (
        <>
            <div>
                <SaveUploadCharacter character={ character }/>
        </div>
            <main className="page-main">
                <div className="load-page-container">
                    Main
                </div>
            </main>
        <div></div>
        </>
    );
    
}