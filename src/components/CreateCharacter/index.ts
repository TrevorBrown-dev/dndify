import { iCharacter } from '../../models/character';
import { CreateCharacter } from './CreateCharacter';
export interface CharacterProps {
    character: iCharacter;
}
export * from './Section';
export * from './Header';
export * from './Race';
export * from './Class';
export * from './HitDice';
export * from './Health';
export * from './Skills';
export * from './CreateSidebar';
export * from './Background';
export default CreateCharacter;
