import { useState, useRef, useEffect } from 'react';
interface AnimationProps {
    from: number;
    to: number;
    speed?: number;
}
export const useScrollbarAnimation = (props: AnimationProps) => {
    const { from, to, speed } = props;
    const [scrollbarWidth, setScrollbarWidth] = useState(from);
    const [targetScrollbarWidth, setTargetScrollbarWidth] = useState(scrollbarWidth);
    const interval = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        const bar = document.querySelector(':root') as HTMLDivElement;
        if (!bar) return;
        bar.style.cssText = `--scrollbar-width: ${scrollbarWidth}px`;
    }, [scrollbarWidth]);

    useEffect(() => {
        interval.current = setInterval(() => {
            setScrollbarWidth((oldScrollbarWidth) => {
                const width = oldScrollbarWidth + Math.sign(targetScrollbarWidth - oldScrollbarWidth);

                if (width === targetScrollbarWidth && interval.current) {
                    clearInterval(interval.current);
                    interval.current = null;
                }
                return width;
            });
        }, speed || 1);
    }, [targetScrollbarWidth, speed]);

    const detectScrollbar: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (interval.current) return;

        if (e.pageX > window.innerWidth - to) {
            setTargetScrollbarWidth(to);
        } else {
            setTargetScrollbarWidth(from);
        }
    };

    return detectScrollbar;
};
