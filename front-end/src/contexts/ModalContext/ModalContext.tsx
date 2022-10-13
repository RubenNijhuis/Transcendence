// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";

interface ModalContextType {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    setModalElement: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ModalContext = createContext<ModalContextType>(null!);

const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalElement, setModalElement] = useState<React.ReactNode>(null!);

    const value: ModalContextType = {
        modalOpen,
        setModalOpen,
        setModalElement
    };

    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body")[0];
        if (modalOpen) {
            bodyElement.style.overflow = "hidden";
        } else {
            bodyElement.style.overflow = "scroll";
        }
    }, [modalOpen]);

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modalOpen && <Modal element={modalElement} />}
        </ModalContext.Provider>
    );
};

export { useModal };
export default ModalProvider;
