// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { ProfileType } from "../../types/profile";
import { MatchRecord } from "../../types/game";

// Data generation
import { generateGameResult, generateProfile } from "./fakeDataGenerators";
import { useUser } from "../UserContext";

////////////////////////////////////////////////////////////

interface FakeDataContextType {
    profiles: ProfileType[];
    leaderBoard: ProfileType[];
    matchHistory: MatchRecord[];
}

const FakeDataContext = createContext<FakeDataContextType>(null!);

const useFakeData = () => useContext(FakeDataContext);

////////////////////////////////////////////////////////////

// Setup data storage and update functions
const FakeDataProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [profiles, setProfiles] = useState<ProfileType[]>(null!);
    const [leaderBoard, setLeaderBoard] = useState<ProfileType[]>(null!);
    const [matchHistory, setMatchHistory] = useState<MatchRecord[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const tempProfiles: ProfileType[] = generateProfile(20);
        const matchResults = generateGameResult(user, 50);

        setProfiles(tempProfiles);
        setLeaderBoard(tempProfiles);
        setMatchHistory(matchResults);
    }, [user]);

    ////////////////////////////////////////////////////////////

    const value: FakeDataContextType = {
        profiles,
        leaderBoard,
        matchHistory
    };

    ////////////////////////////////////////////////////////////

    return (
        <FakeDataContext.Provider value={value}>
            {children}
        </FakeDataContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useFakeData };
export default FakeDataProvider;
