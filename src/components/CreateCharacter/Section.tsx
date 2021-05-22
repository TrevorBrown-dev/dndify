import React from "react"
import { LinkedHeader } from "../misc/LinkedHeader"
import { WikiReference } from "../misc/WikiReference"
interface SectionProps {
    children: React.ReactNode
    id: string;
    title: string;
    icon: string;
    header: string
    wikiReference: string
}
export const Section: React.FC<SectionProps> = ({ children, id, title, icon, header, wikiReference }) => {
    return (
        <section className={`create-header create-${id}`}>
            <LinkedHeader id={id} title={title}>
                <i className={icon} style={{ marginRight: '1em' }}></i>{header}
            </LinkedHeader>
            <WikiReference href={wikiReference} />
            <div className="create-body">
                {children}
            </div>
        </section>
    )
}