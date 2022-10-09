// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Get the user
import { useAuth } from "../AuthContext";

// Types
import { ProfileType } from "../../types/profile";
import { MatchRecord } from "../../types/game";

// Data generation
import { generateGameResult, generateProfile } from "./fakeDataGenerators";

// What kind of data and functions the context consists of
interface FakeDataContextType {
    profiles: ProfileType[];
    setProfiles: React.Dispatch<React.SetStateAction<ProfileType[]>>;

    leaderBoard: ProfileType[];
    setLeaderBoard: React.Dispatch<React.SetStateAction<ProfileType[]>>;

    matchHistory: MatchRecord[];
    setMatchHistory: React.Dispatch<React.SetStateAction<MatchRecord[]>>;

    fakeUser: ProfileType;
    setFakeUser: React.Dispatch<React.SetStateAction<ProfileType>>;
}

// Create context
const FakeDataContext = createContext<FakeDataContextType>(null!);

// Create an alias
const useFakeData = () => useContext(FakeDataContext);

// Setup data storage and update functions
const FakeDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [fakeUser, setFakeUser] = useState<ProfileType>(null!);
    const [profiles, setProfiles] = useState<ProfileType[]>(null!);
    const [leaderBoard, setLeaderBoard] = useState<ProfileType[]>(null!);
    const [matchHistory, setMatchHistory] = useState<MatchRecord[]>(null!);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const tempProfiles: ProfileType[] = generateProfile(20);
        setProfiles(tempProfiles);
        setLeaderBoard(tempProfiles);
        setMatchHistory(generateGameResult(user, 50));
    }, [user]);

    const value = {
        fakeUser,
        setFakeUser,
        profiles,
        setProfiles,
        leaderBoard,
        setLeaderBoard,
        matchHistory,
        setMatchHistory
    };

    return (
        <FakeDataContext.Provider value={value}>
            {children}
        </FakeDataContext.Provider>
    );
};

export { useFakeData };
export default FakeDataProvider;
