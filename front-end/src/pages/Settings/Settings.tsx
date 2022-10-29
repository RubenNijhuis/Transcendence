// React
import { useEffect } from "react";

// UI
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

// Auth
import { useAuth } from "../../contexts/AuthContext";

// Modal
import { useModal } from "../../contexts/ModalContext";
import TwoFactorAuthentication from "../../containers/TwoFactorAuthentication";

////////////////////////////////////////////////////////////

const SettingsPage = (): JSX.Element => {
    const { tfaEnabled } = useAuth();
    const { setModalElement, setModalOpen } = useModal();

    ////////////////////////////////////////////////////////////

    const renderTFAModal = () => {
        setModalElement(<TwoFactorAuthentication />);
        setModalOpen(true);
    };

    ////////////////////////////////////////////////////////////

    /**
     * It's a bit weird but closing modals must be done through
     * the parent component, the easiest/maybe only way to do
     * this without defining props in the child component
     * is to listen to state changes, specifically the state
     * that should be updated through the modal
     *
     * And because most data is often just toggles we can
     * close the modal if it's updated :)
     */
    useEffect(() => {
        setModalOpen(false);
    }, [tfaEnabled]);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Heading type={1}>Settings page</Heading>
            <Button theme="dark" onClick={renderTFAModal}>
                {tfaEnabled
                    ? "Turn off 2 factor authentication"
                    : "Turn on 2 factor authentication"}
            </Button>
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default SettingsPage;
