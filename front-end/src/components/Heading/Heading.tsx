import {
    StyledH1,
    StyledH2,
    StyledH3,
    StyledH4,
    StyledH5,
    StyledH6,
} from "./Heading.style";

////////////////////////////////////////////////////////////

interface IHeading {
    type: number;
    children: React.ReactNode;
}

/**
 * Standardizes how we use headers
 */
const Heading = ({ type, children }: IHeading): JSX.Element => {
    const classname = "heading";

    switch (type) {
        case 1:
            return <StyledH1 className={classname}>{children}</StyledH1>;
        case 2:
            return <StyledH2 className={classname}>{children}</StyledH2>;
        case 3:
            return <StyledH3 className={classname}>{children}</StyledH3>;
        case 4:
            return <StyledH4 className={classname}>{children}</StyledH4>;
        case 5:
            return <StyledH5 className={classname}>{children}</StyledH5>;
        case 6:
            return <StyledH6 className={classname}>{children}</StyledH6>;
        default:
            return <StyledH1 className={classname}>{children}</StyledH1>;
    }
};

///////////////////////////////////////////////////////////

export default Heading;
