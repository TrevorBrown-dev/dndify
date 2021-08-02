import React from 'react';
import { Link } from 'react-router-dom';
import { SlidingIconButton } from '../misc/SlidingIconButton';
import { DnDAndSVG } from '../svg/DnDAndSVG';

export const Home: React.FC = () => {
    /*
        TODO: Rework these to be sliding icon buttons
    */
    return (
        <div className='center-content home' style={{ height: '100vh', gridColumn: '1/-1' }}>
            <DnDAndSVG size='50vh' stroke='black' style={{ animationDuration: '1s' }} fill='#E40712' strokeWidth='0.5' />
            <div className='home-button-container flex-between color-off-light '>
                <Link to='/create' className='no-decoration color-off-primary-hover fill'>
                    <SlidingIconButton icon='fas fa-user-plus'>Create Character</SlidingIconButton>
                </Link>
                <Link to='/load' className='no-decoration color-off-primary-hover fill'>
                    <SlidingIconButton iconSide='right' icon='fas fa-file-upload'>
                        Load Character
                    </SlidingIconButton>
                </Link>
            </div>
        </div>
    );
};
