// UI
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";

import {
    FriendSettings,
    GameSettings,
    ProfileSettings,
} from "../../containers/Settings";

////////////////////////////////////////////////////////////

const SettingsPage = (): JSX.Element => {
    return (
        <Layout>
            <Heading type={1}>Settings page</Heading>

            <ProfileSettings />

            <FriendSettings />

            <GameSettings />
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default SettingsPage;
