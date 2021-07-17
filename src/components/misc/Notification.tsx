import { useState, useCallback } from "react";

interface NotificationProps {
    message: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    timeout: NodeJS.Timeout | undefined;
    setCurrentTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;
}
export const usePopup = (message: string) => {
    const [visible, _setVisible] = useState(false);
    const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();
    const setVisible = useCallback(() => {
        if (currentTimeout) return;
        _setVisible(true);
        clearTimeout(currentTimeout);
        setCurrentTimeout(setTimeout(() => {
            _setVisible(false)
            setCurrentTimeout(undefined);
        }, 3500));
    }, [_setVisible, currentTimeout])
    const Popup = () => {
        return (visible && <Notification message={message} setVisible={_setVisible} setCurrentTimeout={setCurrentTimeout} timeout={currentTimeout} />)
    }

    return [setVisible, Popup];
}
const Notification: React.FC<NotificationProps> = ({ message, setVisible, timeout, setCurrentTimeout }) => {
    return (
        <div className="notification pointer" onClick={() => {
            setVisible(false);
            timeout && clearTimeout(timeout);
            setCurrentTimeout(undefined);
        }}>
            <div className="fill"></div>
            <div className="content">
                {message}
            </div>
        </div>
    );
}