import React, { useEffect, useRef, useState } from "react";
import Button from "../../Button";

import { Container, ChangeSlideButtons } from "./BoxSlider.style";

interface Props {
    children: React.ReactNode;
}

interface SliderDotsProps {
    amount: number;
    active: number;
}

const SliderDots = ({ amount, active }: SliderDotsProps) => {
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
                {(() => {
                    const arr: React.ReactNode[] = [];
                    for (let i = 0; i < amount; i++) {
                        arr.push(
                            <div
                                key={i}
                                className="step__dot"
                                style={{
                                    backgroundColor:
                                        active === i
                                            ? "rgb(30,30,30)"
                                            : "rgb(200,200,200)",
                                    width: 18,
                                    height: 18,
                                    borderRadius: 1000
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
    const boxSlidesContainerRef = useRef<HTMLDivElement>(null!);

    const changeSlide = (amount: number) => {
        // Amount must not go below 0 or higher than amount slides
        if (activeSlide + amount > -1 && activeSlide + amount < amountSlides) {
            setActiveSlide(activeSlide + amount);
        }

        const boxSliderWidth: number =
            boxSlidesContainerRef.current.offsetWidth;

        boxSlidesContainerRef.current.scrollBy(boxSliderWidth * amount, 0);
    };

    useEffect(() => {
        setAmountSlides(boxSlidesContainerRef.current.childNodes.length);
    }, [children, setAmountSlides]);

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
