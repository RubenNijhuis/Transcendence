// Components
import GameCard from "../components/GameCard";
import Layout from "../components/Layout";

// Styling
import { magicNum } from "../utils/StylingConstants";

const Play = () => {
    return (
        <Layout>
                <div
                    style={{
                        width: "100%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "row",
                        gap: magicNum,
                        justifyContent: "center"
                    }}
                >
                    <GameCard
                        img_url="https://images.unsplash.com/photo-1570572137089-1655117ad216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9uZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                        title="Classic"
                        description="Try to beat your friends in this classic version of pong"
                        url="classic"
                        cta="Play Classic Pong"
                    />

                    <GameCard
                        img_url="https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2FtZSUyMGV4cGxvc2lvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                        title="Powered"
                        description="This alternative version of pong keeps you at the edge of your seat with powerups that can change the game at any moment"
                        url="powered"
                        cta="Play Powered Pong"
                    />
                </div>
        </Layout>
    );
};

export default Play;
