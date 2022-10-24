// Styling
import { Container } from "./Asset.style";

////////////////////////////////////////////////////////////

interface Props {
    url: string;
    alt: string;
    className?: string;
}

const Asset = ({ url, alt, className }: Props): JSX.Element => {
    let classTag: string = "asset";

    ////////////////////////////////////////////////////////////

    if (className !== undefined) {
        classTag += ` ${className}`;
    }

    if (alt.length === 0) {
        console.error(`No className specified for alt: ${alt}`);
    }

    ////////////////////////////////////////////////////////////

    return (
        <Container className={classTag}>
            <img src={url} alt={alt} />
        </Container>
    );
};

export default Asset;
