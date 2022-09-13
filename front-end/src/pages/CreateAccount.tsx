// Requests
import Axios from "axios";

// React
import { useEffect, useState } from "react";

// Styling
import styled from "styled-components";
import { magicNum, smallRadius } from "../utils/StylingConstants";

// UI
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Auth
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

interface AccountData {
    userName: string;
    color: string;
    description: string;
    intraId: string;
}

const StyledInput = styled.div`
    margin-bottom: 36px;

    label {
        display: block;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 9px;
    }

    input,
    textarea {
        width: 100%;
        border: 1px rgb(230, 230, 230);
        height: 36px;
        padding: 9px 18px;
        border-radius: ${smallRadius};
    }
`;

const CreateForm = styled.div`
    width: calc(${magicNum} * 10);
    max-width: calc(${magicNum} * 10);
    margin: auto;

    button {
        width: 100%;
    }
`;

const CreateAccount = () => {
    const [userName, setUserName] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { authToken, user } = useAuth();
    const navigate = useNavigate();

    const handleCreation = () => {
        if (user !== null) {
            const accountData: AccountData = {
                intraId: user.intraID,
                userName,
                color,
                description
            };

            const jwtConfig = {
                headers: { Authorization: `Bearer ${authToken}` }
            };

            Axios.post("/api/users/create", accountData, jwtConfig);
        }
    };

    useEffect(() => {
        // If the user hasn't tried to log in redirect to home
        if (authToken === null) {
            navigate("/");
        }
    }, [authToken, navigate]);

    return (
        <Layout>
            <CreateForm>
                <Heading type={1}>Create an account</Heading>
                <StyledInput>
                    <label>Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </StyledInput>
                <StyledInput>
                    <label>Color</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </StyledInput>
                <StyledInput>
                    <label>Short description</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </StyledInput>
                <Button theme="dark" onClick={handleCreation}>
                    Ja doe maar
                </Button>
            </CreateForm>
        </Layout>
    );
};

export default CreateAccount;
