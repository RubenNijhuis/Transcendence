import { Fragment } from "react";

// Authentication
import AuthContext from "./utils/AuthContext";

// Misc
import GlobalStyle from "./utils/GlobalStyle";
import Router from "./containers/Routes/Routes";

const App = () => {
    return (
        <Fragment>
            <AuthContext.Provider value={{ user: true }}>
                {/* Global Styling */}
                <GlobalStyle />

                {/* Page routing */}
                <Router />
            </AuthContext.Provider>
        </Fragment>
    );
};

export default App;
