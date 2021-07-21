interface SlidingIconButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: string;
    text: string;
}
export const SlidingIconButton: React.FC<SlidingIconButtonProps> = ({ icon, text, className, onClick, title }) => {
    return (
        <div className={`sliding-icon-button ${className}`} title={title} onClick={onClick}>
            <i className={`sliding-icon ${icon}`}></i>
            <div className='sliding-text center-content'>{text}</div>
        </div>
    );
};
