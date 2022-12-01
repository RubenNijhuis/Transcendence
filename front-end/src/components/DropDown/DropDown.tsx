import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageRoutes from "../../config/PageRoutes";
import { Container, List } from "./DropDown.style";

const DropDown = () => {
    const [open, setOpen] = useState(false);

    const { signOut } = useAuth();

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <Container>
            <FiSettings onClick={handleOpen} className="settings-icon" />
            { open ? (
                <List>
                    <li key="settings">
                        <Link to={PageRoutes.settings} className="link" >{"settings"}</Link>
                    </li>
                    <li key="logout">
                        <Link onClick={signOut} to={PageRoutes.home} className="link" >{"logout"}</Link>
                    </li>
                </List>
            ): null}
        </Container>
    );
};

export default DropDown;