// React
import { useEffect } from "react";

// UI
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import TwoFactorAuthentication from "../../TwoFactorAuthentication";

// Auth
import { useAuth } from "../../../contexts/AuthContext";

// Modal
import { useModal } from "../../../contexts/ModalContext";

////////////////////////////////////////////////////////////

const ProfileSettings = () => {
    const { tfaEnabled } = useAuth();
    const { setModalElement, setModalActive } = useModal();

    ////////////////////////////////////////////////////////////

    const renderTFAModal = () => {
        setModalElement(<TwoFactorAuthentication />);
        setModalActive(true);
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
        setModalActive(false);
    }, [tfaEnabled]);

    ////////////////////////////////////////////////////////////

    return (
        <section>
            <Heading type={3}>Profile settings</Heading>
            <Button theme="dark" onClick={renderTFAModal}>
                Turn {tfaEnabled ? "off" : "on"} 2 factor authentication"
            </Button>
            <span>Change profile picture</span>
            <span>Change banner picture</span>
            <span>Change description picture</span>
            <span>Change color picture</span>
            <span>Change blocked picture</span>
            <span>Change friends picture</span>
        </section>
    );
};

export default ProfileSettings;
