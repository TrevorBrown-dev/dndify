import { useModal } from 'src/components/Modal';
import { iFeatModel } from 'src/models/feats/feats';
import { CharacterProps } from '..';
import { RollablePropertyModal } from '../Items/RollablePropertyModal';

interface FeatCardProps extends CharacterProps {
    feat: iFeatModel;
}

export const FeatCard: React.FC<FeatCardProps> = ({ feat, character }) => {
    const [toggleOpen, featModal] = useModal(<RollablePropertyModal character={character} weaponProps={feat.rollableProps} />);
    const { rollableProps } = feat;

    return (
        <>
            {featModal}
            <div className='feat-card'>
                <div className='feat-card-container'>
                    <div className='feat-card-content'>
                        <header className='header'>
                            <h4>{feat.name}</h4>
                        </header>

                        <div className='description'>{feat.notes}</div>

                        <div className='rollable center-content'>
                            <i
                                className={`fas fa-dice-d20 rollable ${rollableProps.length !== 0 && 'hoverable-half color-primary-hover'}`}
                                onClick={toggleOpen}
                                style={{
                                    color: rollableProps.length !== 0 ? 'black' : '#919191',
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
