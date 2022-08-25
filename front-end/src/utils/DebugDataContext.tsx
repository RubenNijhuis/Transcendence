// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Get the user
import { useAuth } from "./AuthContext";

// Types
import { GroupChat, Profile } from "./GlobalTypes";

// Data generation
import { generateGroupChats, generateProfile } from "./randomDataGenerator";

// What kind of data and functions the context consists of
interface DataDebugContextType {
    profiles: Profile[];
    setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;

    leaderBoard: Profile[];
    setLeaderBoard: React.Dispatch<React.SetStateAction<Profile[]>>;

    chats: GroupChat[];
    setChats: React.Dispatch<React.SetStateAction<GroupChat[]>>;
}

// Create context
const DataDebugContext = createContext<DataDebugContextType>(null!);

// Create an alias
const useDataDebug = () => useContext(DataDebugContext);

// Setup data storage and update functions
const DataDebugProvider = ({ children }: { children: React.ReactNode }) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [chats, setChats] = useState<GroupChat[]>([]);
    const [leaderBoard, setLeaderBoard] = useState<Profile[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        setProfiles(generateProfile(10));
        setChats(generateGroupChats(user, 3, 2));
        setLeaderBoard(profiles);
    }, [user]);

    const value = {
        profiles,
        setProfiles,
        chats,
        setChats,
        leaderBoard,
        setLeaderBoard
    };

    return (
        <DataDebugContext.Provider value={value}>
            {children}
        </DataDebugContext.Provider>
    );
};

export { useDataDebug };
export default DataDebugProvider;
