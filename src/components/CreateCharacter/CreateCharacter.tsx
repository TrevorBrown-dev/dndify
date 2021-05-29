import React from "react";
import { blankCharacter, iCharacterModel, useCharacter } from "../../models/character";
import { SaveUploadCharacter } from "../SaveUploadCharacter";
import { Header, Race, Class, HitDice, Health, CreateSidebar } from "./";
import { Background } from "./Background";
import { MiniStats } from "./MiniStats";
import { Skills } from "./Skills";
import { SavingThrows } from "./SavingThrows";
import { OtherProficiencies } from "./OtherProficiencies";
import { Alignment } from "./Alignment";



export const CreateCharacter: React.FC = () => {
  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     return "Confirm Form Resubmision";
  //   }
  //   return (() => {
  //     window.onbeforeunload = null;
  //   })
  // }, [])
  const char: iCharacterModel = blankCharacter();
  const character = useCharacter(char);
  /* 
    Render the stats
    Create inputs for the stats,
    create a button to roll the stats automatically
    Save button
  */

  return (
    <>
      <CreateSidebar />
      <main className="page-main">
        <div className="create-character">
          <Header character={character} />
          <div className="create-main">
            <Race character={character} />
            <Alignment character={character} />
            <Background character={character} />
            <Class character={character} />
            <HitDice character={character} />
            <Health character={character} />
            <SavingThrows character={character} />
            <Skills character={character} />
            <OtherProficiencies character={character} />

          </div>
        </div>
      </main>
      <MiniStats character={character} />
    </>
  );
}