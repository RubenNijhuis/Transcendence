// React
import React, { useEffect, useRef, useState } from "react";

// UI
import Button from "../../Button";

// Styling
import { Container, ChangeSlideButtons } from "./BoxSlider.style";

////////////////////////////////////////////////////////////

interface Props {
    children: React.ReactNode;
<<<<<<< Updated upstream
=======
    onSlideChange: () => void;
>>>>>>> Stashed changes
}

interface SliderDotsProps {
    amount: number;
    active: number;
}

const Dot = ({ active }: { active: boolean }): JSX.Element => {
    return (
        <div
            className="step__dot"
            style={{
                backgroundColor: active ? "rgb(30,30,30)" : "rgb(200,200,200)",
                width: 18,
                height: 18,
                borderRadius: 1000
            }}
        >
            <span />
        </div>
    );
};

// TODO: styling in seperate folder
const SliderDots = ({ amount, active }: SliderDotsProps): JSX.Element => {
    return (
        <div
            className="steps__container"
            style={{ display: "flex", padding: 9 }}
        >
            <div
                className="steps"
                style={{
                    display: "flex",
                    gap: 9,
                    margin: "auto"
                }}
            >
                {/*
                 * TODO: make seperate function of this
                 * Weird way in jsx to use for loop but
                 * whatev
                 */}
                {[amount].map((val, count) => (
                    <Dot active={count === active} key={count} />
                ))}
            </div>
        </div>
    );
};

const BoxSlider = ({ children }: Props): JSX.Element => {
    const [amountSlides, setAmountSlides] = useState<number>(1);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const boxSlidesContainerRef = useRef<HTMLDivElement>(null!);

    ////////////////////////////////////////////////////////////

    const changeSlide = (amount: number): void => {
        // Amount must not go below 0 or higher than amount slides
        if (activeSlide + amount > -1 && activeSlide + amount < amountSlides) {
            setActiveSlide(activeSlide + amount);
        }

        const boxSliderWidth: number =
            boxSlidesContainerRef.current.offsetWidth;

        boxSlidesContainerRef.current.scrollBy(boxSliderWidth * amount, 0);
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setAmountSlides(boxSlidesContainerRef.current.childNodes.length);
    }, [children, setAmountSlides]);

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div ref={boxSlidesContainerRef} className="slides">
                {[...[children]]}
            </div>
            <SliderDots amount={amountSlides} active={activeSlide} />
            <ChangeSlideButtons>
                <Button
                    theme="dark"
                    className="button"
                    onClick={() => changeSlide(-1)}
                >
                    👈
                </Button>
                <Button
                    theme="dark"
                    className="button"
                    onClick={() => changeSlide(1)}
                >
                    👉
                </Button>
            </ChangeSlideButtons>
        </Container>
    );
};

export default BoxSlider;
