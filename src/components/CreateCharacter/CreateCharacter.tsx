import { iCharacterModel, useCharacter } from "../../models/character";
import { SaveUploadCharacter } from "../SaveUploadCharacter";
import { CreateCharacterClass } from "./CreateCharacterClass";
import { CreateCharacterHeader } from "./CreateCharacterHeader";
import { CreateCharacterHitDice } from "./CreateCharacterHitDice";
import { CreateCharacterRace } from "./CreateCharacterRace";



export const CreateCharacter: React.FC = () => {
  const char: iCharacterModel = {
    name: '',
    race: '',
    stats: [
      {
        name: "Strength",
        short_name: "Str",
        value: 0
      },
      {
        name: "Dexterity",
        short_name: "Dex",
        value: 0
      },
      {
        name: "Constitution",
        short_name: "Con",
        value: 0
      },
      {
        name: "Intelligence",
        short_name: "Int",
        value: 0
      },
      {
        name: "Wisdom",
        short_name: "Wis",
        value: 0
      },
      {
        name: "Charisma",
        short_name: "Cha",
        value: 0
      },
    ],
    classes: []
  }
  const character = useCharacter(char);
  /* 
    Render the stats
    Create inputs for the stats,
    create a button to roll the stats automatically
    Save button
  */
  return (
    <div className="create-character">
      <CreateCharacterHeader character={character} />
      <main className="create-main">
        <CreateCharacterRace character={character} />
        <CreateCharacterClass character={character} />
        <CreateCharacterHitDice />
        <SaveUploadCharacter character={character} />
      </main>
    </div>
  );
}