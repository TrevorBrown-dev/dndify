interface SlidingIconButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: string;
    iconSide?: 'left' | 'right';
}
export const SlidingIconButton: React.FC<SlidingIconButtonProps> = ({ icon, iconSide, children, className, onClick, title }) => {
    if (!iconSide) iconSide = 'left';
    return (
        <div className={`sliding-icon-button ${className}`} title={title} onClick={onClick}>
            {iconSide === 'left' ? (
                <>
                    <i className={`sliding-icon ${icon}`}></i>
                    <div className={`sliding-text center-content si-${iconSide}`}>{children}</div>
                </>
            ) : (
                <>
                    <div className={`sliding-text center-content si-${iconSide}`}>{children}</div>
                    <i className={`sliding-icon ${icon}`}></i>
                </>
            )}
        </div>
    );
};
