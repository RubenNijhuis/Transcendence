import { Container } from "./Slide.style";

interface Props {
    children: React.ReactNode;
}

const Slide = ({ children }: Props) => {
    return <Container>{children}</Container>;
};

export default Slide;
