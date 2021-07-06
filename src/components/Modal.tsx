import React, { useCallback, useState } from 'react';
import { CharacterProps } from './CreateCharacter';
interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
}
const Modal: React.FC<ModalProps> = ({ children, active, setActive }) => {
    return active ? (
        <>
            <div
                className="modal"
                onClick={(e) => {
                    setActive(false);
                }}>
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}>
                    <i
                        onClick={(e) => {
                            setActive(false);
                        }}
                        className="far fa-times close-button hoverable-half color-primary-hover"></i>
                    {children}
                </div>
            </div>
        </>
    ) : (
        <></>
    );
};
type ModalTuple = [() => void, JSX.Element];
export const useModal = (children: React.ReactNode): ModalTuple => {
    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => {
        setActive((a) => !a);
    }, [setActive]);

    return [
        toggleActive,
        <Modal active={active} setActive={setActive}>
            {children}
        </Modal>,
    ];
};
