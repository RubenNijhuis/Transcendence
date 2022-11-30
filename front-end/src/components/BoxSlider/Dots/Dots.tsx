import {
    lightTextColor,
    magicNum,
    mainColor,
} from "../../../styles/StylingConstants";

interface ISliderDots {
    amount: number;
    active: number;
}

const Dot = ({ active }: { active: boolean }): JSX.Element => {
    return (
        <div
            className="step__dot"
            style={{
                backgroundColor: active ? mainColor : lightTextColor,
                width: 18,
                height: 18,
                borderRadius: 1000,
            }}
        >
            <span />
        </div>
    );
};

const SliderDots = ({ amount, active }: ISliderDots): JSX.Element => {
    const dots = [];

    for (let i = 0; i < amount; i++) {
        dots.push(<Dot active={i === active} key={i} />);
    }

    return (
        <div
            className="steps__container"
            style={{ display: "flex", padding: `calc(${magicNum} / 2)` }}
        >
            <div
                className="steps"
                style={{
                    display: "flex",
                    gap: 9,
                    margin: "auto",
                }}
            >
                {dots}
            </div>
        </div>
    );
};

export default SliderDots;
