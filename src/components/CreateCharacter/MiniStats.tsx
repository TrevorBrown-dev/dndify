import { CharacterProps } from ".";
import { SaveUploadCharacter } from "../SaveUploadCharacter";
import { Sidebar } from "../Sidebar";
import { CharacterInfo } from "./CharacterInfo";

export const MiniStats: React.FC<CharacterProps> = ({ character }) => {

    const renderStats = (): JSX.Element[] => {
        const { stats } = character.stats;
        return stats.map(({ name, value, short_name }) => {
            const mod = character.stats.modifier(name);
            const modifier = (mod >= 0) ? `+${mod}` : mod
            return (
                <div className="center-grid-justified" key={`mini-level-${name}`} style={(value !== 0) ? {} : { display: 'none' }}>
                    <div className="left" style={{ marginRight: ".4em" }}>{name}: </div>
                    <div className="right">{value}<sub>({modifier})</sub></div>
                </div>

            )
        })
    }


    return (
        <Sidebar>
            <div className="mini-stats" style={{ height: '100vh', position: 'relative' }}>
                <h3>{character.name}</h3>
                <sub><CharacterInfo character={character} style={{ fontSize: '.8em', marginBottom: '.5em' }} /></sub>
                <div className="mini-stats-stats">
                    {renderStats()}
                    {
                        (character.proficiency !== 1) ? <span>Proficiency: +{character.proficiency}</span> : ""

                    }
                </div>

                <div style={{
                    position: 'absolute', bottom: '1em', left: '25%'
                }}>

                    <SaveUploadCharacter character={character} />
                </div>
            </div>
        </Sidebar>
    )
}