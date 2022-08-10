import {
    StyledH1,
    StyledH2,
    StyledH3,
    StyledH4,
    StyledH5,
    StyledH6,
} from "./Heading.style";

interface Props {
    type: Number;
    children: React.ReactNode;
}

const Heading = ({ type, children }: Props) => {
    switch (type) {
        case 1:
            return <StyledH1>{children}</StyledH1>;
        case 2:
            return <StyledH2>{children}</StyledH2>;
        case 3:
            return <StyledH3>{children}</StyledH3>;
        case 4:
            return <StyledH4>{children}</StyledH4>;
        case 5:
            return <StyledH5>{children}</StyledH5>;
        case 6:
            return <StyledH6>{children}</StyledH6>;
        default:
            return <StyledH1>{children}</StyledH1>;;
    }
};

export default Heading;
