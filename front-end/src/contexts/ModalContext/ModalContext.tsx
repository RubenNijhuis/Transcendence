// React stuffs
import React, { createContext, useContext, useState } from "react";

// Modal
import ErrorModal from "../../components/ErrorModal";

// Types
import { RequestError } from "../../types/request";

interface ModalContextType {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    error: RequestError;
    setError: React.Dispatch<React.SetStateAction<any>>;
}

const ModalContext = createContext<ModalContextType>(null!);

const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<any>("");

    const value: ModalContextType = {
        isModalOpen,
        setIsModalOpen,
        error,
        setError
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
            {isModalOpen && <ErrorModal error={error} setIsModalOpen={setIsModalOpen} />}
        </ModalContext.Provider>
    );
};

export { useModal };
export default ModalProvider;