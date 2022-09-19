import { useEffect, useState } from "react";

import { Container } from "./BoxSlider.style";

interface Props {
    children: React.ReactNode;
}

interface SliderDotsProps {
    amount: number;
    active: number;
}

const SliderDots = ({ amount, active }: SliderDotsProps) => {
    return (
        <div className="steps__container">
            <div className="steps">
                {/*
                 * TODO: make seperate function of this
                 * Weird way in jsx to use for loop but
                 * whatev
                 */}
                {(() => {
                    const arr: React.ReactNode[] = [];
                    for (let i = 0; i < amount; i++) {
                        arr.push(
                            <div
                                className="step__dot"
                                style={{
                                    backgroundColor:
                                        active === i ? "red" : "green"
                                }}
                            >
                                <span />
                            </div>
                        );
                    }
                    return arr;
                })()}
            </div>
        </div>
    );
};

const BoxSlider = ({ children }: Props) => {
    const [amountSlides, setAmountSlides] = useState<number>(1);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    useEffect(() => {
        console.log(children);
    });

    return (
        <Container>
            <div className="slides">{children}</div>
            <SliderDots amount={amountSlides} active={activeSlide} />
        </Container>
    );
};

export default BoxSlider;
