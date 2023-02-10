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
import UploadDescription from "./Description";

// Styling
import {
    backgroundColor,
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UploadColor from "./Color/UploadColor";
import ChangeBanStatus from "./Ban";
import ChangeFriends from "./Friends";
import { useUser } from "../../../contexts/UserContext";

// TODO: in style file
const Container = styled.section`
    background-color: ${backgroundColor};
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    margin-bottom: calc(${magicNum} / 2);

    .header,
    .content {
        padding: calc(${magicNum} / 2);
    }

    .header {
        background-color: ${mainColor};
        .heading {
            margin-bottom: 0;
            color: ${lightTextColor};
        }
    }
`;

////////////////////////////////////////////////////////////

const ProfileSettings = () => {
    const { tfaEnabled } = useAuth();
    const { setModalElement, openModal } = useModal();
    const { user } = useUser();

    ////////////////////////////////////////////////////////

    const renderTFAModal = () => {
        setModalElement(<TwoFactorAuthentication user={user} showToggle={true} />);
        openModal(true);
    };

    // const uploadProfilePicture = () => {
    //     setModalElement(<UploadProfilePicture />);
    //     openModal(true);

    // }

    ////////////////////////////////////////////////////////

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
        openModal(false);
    }, [tfaEnabled]);

    ////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="header">
                <Heading type={3}>Profile settings</Heading>
            </div>
            <div className="content">
                <br />
                <UploadProfilePicture />
                <UploadBanner />
                {/* <Button theme="dark" onClick={uploadProfilePicture}>
                Change profile picture
            </Button> */}
                <UploadDescription />
                <UploadColor />
                <ChangeBanStatus />
                <ChangeFriends />
                <Button theme="dark" onClick={renderTFAModal}>
                    Turn {tfaEnabled ? "off" : "on"} 2 factor authentication
                </Button>
            </div>
        </Container>
    );
};

export default ProfileSettings;
