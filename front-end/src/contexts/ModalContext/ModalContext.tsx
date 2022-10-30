// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// UI
import Modal from "../../components/Modal";

////////////////////////////////////////////////////////////

interface ModalContextType {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;

    setModalElement: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ModalContext = createContext<ModalContextType>(null!);

const useModal = () => useContext(ModalContext);

////////////////////////////////////////////////////////////

const ModalProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [modalActive, setModalActive] = useState<boolean>(false);
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

        setModalElement
    };

    ////////////////////////////////////////////////////////////

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modalActive && (
                <Modal setModalActive={setModalActive}>{modalElement}</Modal>
            )}
        </ModalContext.Provider>
    );
};

export { useModal };
export default ModalProvider;
