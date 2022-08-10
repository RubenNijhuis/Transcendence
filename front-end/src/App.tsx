import { Fragment } from "react";

// Authentication
import AuthProvider from "./utils/AuthContext";

// Misc
import GlobalStyle from "./utils/GlobalStyle";
import Router from "./containers/Routes/Routes";

const App = () => {
    return (
        <Fragment>
            <AuthProvider>
                {/* Global Styling */}
                <GlobalStyle />

                {/* Page routing */}
                <Router />
            </AuthProvider>
        </Fragment>
    );
};

export default App;
