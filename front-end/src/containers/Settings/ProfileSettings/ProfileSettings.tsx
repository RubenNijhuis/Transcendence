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
import UploadProfilePicture from "./ProfilePicture/UploadProfilePicture";
import UploadBanner from "./Banner";


////////////////////////////////////////////////////////////

const ProfileSettings = () => {
    const { tfaEnabled } = useAuth();
    const { setModalElement, setModalActive } = useModal();

    ////////////////////////////////////////////////////////////

    const renderTFAModal = () => {
        setModalElement(<TwoFactorAuthentication />);
        setModalActive(true);
    };

    // const uploadProfilePicture = () => {
    //     setModalElement(<UploadProfilePicture />);
    //     setModalActive(true);
        
    // }

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
                Turn {tfaEnabled ? "off" : "on"} 2 factor authentication
            </Button>
            <br/>
            <UploadProfilePicture />
            <UploadBanner />
            {/* <Button theme="dark" onClick={uploadProfilePicture}>
                Change profile picture
            </Button> */}
            <span>Change description </span>
            <span>Change color </span>
            <span>Change blocked </span>
            <span>Change friends </span>
        </section>
    );
};

export default ProfileSettings;
