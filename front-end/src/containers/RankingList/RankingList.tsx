// Styling
import {
    EntryList,
    Entry,
    ImageContainer,
    ProfileData,
    GameData
} from "./RankingList.style";

interface rankingType {
    username: string;
    id: number;
    img_url: string;
}

interface Props {
    rankings: rankingType[];
}

const RankingList = ({ rankings }: Props) => (
    <EntryList>
        {rankings.map(
            ({ username, id, img_url }: rankingType, count: number) => (
                <Entry key={count}>
                    <ProfileData>
                        <span>{id}</span>
                        <ImageContainer>
                            <img src={img_url} alt={`profile of ${username}`} />
                        </ImageContainer>
                    </ProfileData>
                    <GameData>
                        <h3>{username}</h3>
                        <span>Games won: 10</span>
                        <span>Highest streak: 10</span>
                    </GameData>
                </Entry>
            )
        )}
    </EntryList>
);

export default RankingList;
