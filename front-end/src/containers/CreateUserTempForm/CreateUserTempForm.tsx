import { useEffect, useState } from "react";

// Debug
import Logger from "../../utils/Logger";

const CreateUserTempForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // post body data
        const userData = {
            user_name: userName,
            email: email,
        };

        // request options
        const options = {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/text",
            },
        };

        const url = "http://localhost:3000";

        // send POST request
        fetch(url, options)
            .then((res) => res.text())
            .then((res) => {
                Logger("DEBUG", "Got from db", res);
            });
    };

    const handleUserNameChange = (e: any) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User name</label>
                <input type="text" onChange={handleUserNameChange} />
            </div>
            <div>
                <label>email</label>
                <input type="text" onChange={handleEmailChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateUserTempForm;
