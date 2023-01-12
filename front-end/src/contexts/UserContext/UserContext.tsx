// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// Types
import * as Profile from "../../types/Profile";

// Debug
import { getFriendsByUsername } from "../../proxies/friend";

///////////////////////////////////////////////////////////

interface UserContextType {
    user: Profile.Instance;
    setUser: React.Dispatch<React.SetStateAction<Profile.Instance>>;

    friends: Profile.Instance[];
    setFriends: React.Dispatch<React.SetStateAction<Profile.Instance[]>>;

    blocked: Profile.Instance[];
    setBlocked: React.Dispatch<React.SetStateAction<Profile.Instance[]>>;
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
    const [user, setUser] = useState<Profile.Instance>(null!);
    const [friends, setFriends] = useState<Profile.Instance[]>([]);
    const [blocked, setBlocked] = useState<Profile.Instance[]>([]);

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;
        console.log(user);
        const getFriends = async () => {
            const retrievedFriends = await getFriendsByUsername(user.username);
            setFriends(retrievedFriends);
            // const retrievedBlocked = await getBlockedProfilesByUs
        };
        getFriends();
    }, [user]);

    ////////////////////////////////////////////////////////

    const value: UserContextType = {
        user,
        setUser,

        friends,
        setFriends,

        blocked,
        setBlocked
    };

    ////////////////////////////////////////////////////////

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

///////////////////////////////////////////////////////////

export { useUser };
export default UserProvider;
