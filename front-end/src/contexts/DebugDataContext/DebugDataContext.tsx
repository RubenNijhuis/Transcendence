// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Get the user
import { useAuth } from "../AuthContext"

// Types
import { GroupChat, MatchRecord, Profile } from "../../types/GlobalTypes";

// Data generation
import {
    generateGameResult,
    generateGroupChats,
    generateProfile
} from "./randomData";

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

    fakeUser: Profile;
    setFakeUser: React.Dispatch<React.SetStateAction<Profile>>;
}

// Create context
const DataDebugContext = createContext<DataDebugContextType>(null!);

// Create an alias
const useDataDebug = () => useContext(DataDebugContext);

// Setup data storage and update functions
const DataDebugProvider = ({ children }: { children: React.ReactNode }) => {
    const [fakeUser, setFakeUser] = useState<Profile>(null!);
    const [profiles, setProfiles] = useState<Profile[]>(null!);
    const [chats, setChats] = useState<GroupChat[]>(null!);
    const [leaderBoard, setLeaderBoard] = useState<Profile[]>(null!);
    const [matchHistory, setMatchHistory] = useState<MatchRecord[]>(null!);

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const tempProfiles: Profile[] = generateProfile(20);
            setProfiles(tempProfiles);
            setChats(generateGroupChats(user, 4, 2, tempProfiles));
            setLeaderBoard(tempProfiles);
            setMatchHistory(generateGameResult(user, 50));
        }
    }, [user]);

    const value = {
        fakeUser,
        setFakeUser,
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
