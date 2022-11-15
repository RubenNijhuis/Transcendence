// Styling
import { Container } from "./Slide.style";

////////////////////////////////////////////////////////////

interface ISlide {
    children: React.ReactNode;
}

const Slide = ({ children }: ISlide): JSX.Element => {
    return <Container className="slide">{children}</Container>;
};

////////////////////////////////////////////////////////////

export default Slide;
