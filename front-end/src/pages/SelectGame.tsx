// UI
import Layout from "../components/Layout";
import PongGameSelect from "../containers/PongGameSelect";

////////////////////////////////////////////////////////////

const SelectGame = (): JSX.Element => {
    return (
        <Layout>
            <PongGameSelect />
        </Layout>
    );
};

export default SelectGame;
