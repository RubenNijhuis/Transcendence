// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { ProfileType } from "../../types/profile";
import { generateProfile } from "../FakeDataContext/fakeDataGenerators";

///////////////////////////////////////////////////////////

interface UserContextType {
    user: ProfileType;
    setUser: React.Dispatch<React.SetStateAction<ProfileType>>;

    friends: ProfileType[];
    setFriends: React.Dispatch<React.SetStateAction<ProfileType[]>>;

    blocked: ProfileType[];
    setBlocked: React.Dispatch<React.SetStateAction<ProfileType[]>>;
}

// Create the context
const UserContext = createContext<UserContextType>(null!);

// Shorthand to use auth as a hook
const useUser = () => useContext(UserContext);

///////////////////////////////////////////////////////////

const UserProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [user, setUser] = useState<ProfileType>(null!);
    const [friends, setFriends] = useState<ProfileType[]>([]);
    const [blocked, setBlocked] = useState<ProfileType[]>([]);

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const retrievedFriends = generateProfile(20);
        setFriends(retrievedFriends);
    }, [user]);

    ////////////////////////////////////////////////////////////

    const value: UserContextType = {
        user,
        setUser,

        friends,
        setFriends,

        blocked,
        setBlocked
    };

    ////////////////////////////////////////////////////////////

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export { useUser };
export default UserProvider;
