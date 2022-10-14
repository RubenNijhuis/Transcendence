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

    ////////////////////////////////////////////////////////////

    return (
        <Container className={classTag}>
            <div className="wrapper">
                <img src={url} alt={alt} />
            </div>
        </Container>
    );
};

export default Asset;
