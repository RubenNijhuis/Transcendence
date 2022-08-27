// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Get the user
import { useAuth } from "./AuthContext";

// Types
import { GroupChat, MatchRecord, Profile } from "./GlobalTypes";

// Data generation
import {
    generateGameResult,
    generateGroupChats,
    generateProfile
} from "./randomDataGenerator";

// What kind of data and functions the context consists of
interface DataDebugContextType {
    profiles: Profile[];
    setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;

    leaderBoard: Profile[];
    setLeaderBoard: React.Dispatch<React.SetStateAction<Profile[]>>;

    chats: GroupChat[];
    setChats: React.Dispatch<React.SetStateAction<GroupChat[]>>;

    matchHistory: MatchRecord[];
    setMatchHistory: React.Dispatch<React.SetStateAction<MatchRecord[]>>;
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
    const [matchHistory, setMatchHistory] = useState<MatchRecord[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setProfiles(generateProfile(10));
            setChats(generateGroupChats(user, 3, 2));
            setLeaderBoard(profiles);
            setMatchHistory(generateGameResult(user, 50));

            console.log(profiles);
        }
    }, []);

    const value = {
        profiles,
        setProfiles,
        chats,
        setChats,
        leaderBoard,
        setLeaderBoard,
        matchHistory,
        setMatchHistory
    };

    return (
        <DataDebugContext.Provider value={value}>
            {children}
        </DataDebugContext.Provider>
    );
};

export { useDataDebug };
export default DataDebugProvider;
