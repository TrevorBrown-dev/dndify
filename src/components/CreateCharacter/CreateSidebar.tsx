import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CharacterProps } from '.';
import { SlidingIconButton } from '../misc/SlidingIconButton';
import { SaveUploadCharacter } from '../SaveUploadCharacter';
import { Sidebar } from '../Sidebar';

export const CreateSidebar: React.FC<CharacterProps> = ({ character }) => {
    const [links, setLinks] = useState<JSX.Element[]>();
    const [elements, setElements] = useState<NodeListOf<HTMLHeadingElement>>();
    useEffect(() => {
        setElements(document.querySelectorAll('.create-header h1.header'));
    }, []);
    useEffect(() => {
        if (!elements) return;
        const l: [string, string][] = [];
        elements.forEach(({ id, title }) => l.push([id, title]));

        setLinks(
            l.map(([id, title]) => {
                const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
                    const el = document.getElementById(id);
                    el?.scrollIntoView();
                };
                return (
                    <span onClick={handleClick} key={`hlink-${id}`}>
                        <div className='create-sidebar-link'>{title}</div>
                    </span>
                );
            })
        );
    }, [elements]);
    return (
        <Sidebar>
            <Link to='/' className='no-underline'>
                <div
                    className='centered'
                    style={{
                        padding: '1em',
                        width: '8.5em',
                        position: 'relative',
                        left: '51%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <SlidingIconButton icon='fas fa-angle-double-left' text='Home' title='Home' className='hoverable color-off-light color-off-primary-hover' />
                </div>
            </Link>
            <SaveUploadCharacter character={character} />
            <div className='header-links' style={{ maxHeight: '80vh' }}>
                {links}
            </div>
        </Sidebar>
    );
};
