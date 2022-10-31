// React
import React, { useEffect, useRef, useState } from "react";

// UI
import Button from "../../Button";
import SliderDots from "../Dots";

// Styling
import { Container, ChangeSlideButtons } from "./BoxSlider.style";

////////////////////////////////////////////////////////////

interface IBoxSlider {
    children: React.ReactNode;
    onSlideChange(): void;
}

const BoxSlider = ({ children, onSlideChange }: IBoxSlider): JSX.Element => {
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

////////////////////////////////////////////////////////////

export default BoxSlider;
