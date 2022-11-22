// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// UI
import Modal from "../../components/Modal";

////////////////////////////////////////////////////////////

interface ModalContextType {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;

    setAllowClose: React.Dispatch<React.SetStateAction<boolean>>;

    setModalElement: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ModalContext = createContext<ModalContextType>(null!);

const useModal = () => useContext(ModalContext);

////////////////////////////////////////////////////////////

interface IModalProvider {
    children: React.ReactNode;
}

const ModalProvider = ({ children }: IModalProvider): JSX.Element => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [allowClose, setAllowClose] = useState<boolean>(true);
    const [modalElement, setModalElement] = useState<React.ReactNode>(null!);

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body")[0];

        if (modalActive) {
            bodyElement.style.overflow = "hidden";
        } else {
            bodyElement.style.overflow = "scroll";
        }
    }, [modalActive]);

    ////////////////////////////////////////////////////////////

    const value: ModalContextType = {
        modalActive,
        setModalActive,

        setModalElement,
        setAllowClose,
    };

    ////////////////////////////////////////////////////////////

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modalActive && (
                <Modal setModalActive={setModalActive} allowClose={allowClose}>
                    {modalElement}
                </Modal>
            )}
        </ModalContext.Provider>
    );
};

export { useModal };
export default ModalProvider;
