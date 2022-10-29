import { Helmet } from "react-helmet-async";
import { authors, description } from "./Head.config";

///////////////////////////////////////////////////////////

const Head = () => {
    return (
        <Helmet>
            {/* Typical stuff */}
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            {/* Configurable stuff */}
            <title>PongHub</title>

            <meta name="author" content={authors}></meta>
            <meta name="description" content={description}/>

            <link rel="canonical" href="http://localhost:8080/" />
        </Helmet>
    );
};

///////////////////////////////////////////////////////////

export default Head;
