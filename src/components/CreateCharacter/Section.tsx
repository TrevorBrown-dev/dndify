import React, { useState } from 'react';
import { LinkedHeader } from '../misc/LinkedHeader';
import { WikiReference } from '../misc/WikiReference';
interface SectionProps {
    children: React.ReactNode;
    id: string;
    title: string;
    icon: string;
    header: string;
    wikiReference: string;
}
export const Section: React.FC<SectionProps> = ({ children, id, title, icon, header, wikiReference }) => {
    const [visible, setVisible] = useState(true);
    return (
        <section className={`create-header create-${id}`}>
            <header>
                <LinkedHeader id={id} title={title}>
                    <i className={icon} style={{ marginRight: '1em' }}></i>
                    {header}
                </LinkedHeader>
                <WikiReference href={wikiReference} />
                <i className={`button-collapse color-primary-hover pointer fas fa-chevron-down ${visible ? 'rotate reverse' : 'rotate'}`} onClick={() => setVisible((v) => !v)}></i>
            </header>
            {visible && <div className='create-body'>{children}</div>}
        </section>
    );
};
