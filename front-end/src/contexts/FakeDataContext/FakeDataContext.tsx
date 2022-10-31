// Regular react
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { Game, Profile } from "../../types";

// Data generation
import { generateGameResult, generateProfile } from "./fakeDataGenerators";
import { useUser } from "../UserContext";

////////////////////////////////////////////////////////////

interface FakeDataContextType {
    profiles: Profile.Instance[];
    leaderBoard: Profile.Instance[];
    matchHistory: Game.MatchRecord[];
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
    const [profiles, setProfiles] = useState<Profile.Instance[]>(null!);
    const [leaderBoard, setLeaderBoard] = useState<Profile.Instance[]>(null!);
    const [matchHistory, setMatchHistory] = useState<Game.MatchRecord[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const tempProfiles: Profile.Instance[] = generateProfile(20);
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
