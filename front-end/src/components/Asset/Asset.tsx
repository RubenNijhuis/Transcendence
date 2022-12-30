// Styling
import { Container } from "./Asset.style";

////////////////////////////////////////////////////////////

interface IAsset {
    url: string;
    alt: string;
    className?: string;
}

const Asset = ({ url, alt, className }: IAsset): JSX.Element => {
    let classTag = "asset";

    ////////////////////////////////////////////////////////

    if (className !== undefined) {
        classTag += ` ${className}`;
    }

    if (alt.length === 0) {
        console.error(`No alt specified for image`);
    }

    ////////////////////////////////////////////////////////

    return (
        <Container className={classTag}>
            <img src={url} alt={alt} />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default Asset;
