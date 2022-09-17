// Authentication
import AuthProvider from "./contexts/AuthContext";

// Misc
import GlobalStyle from "./utils/GlobalStyle";
import Router from "./containers/Routes/Routes";

// Only for debug purposes
import DataDebugProvider from "./utils/DebugDataContext";

const App = () => (
    <AuthProvider>
        {/* TODO: remove data debug provider */}
        <DataDebugProvider>
            {/* Global Styling */}
            <GlobalStyle />

            {/* Page routing */}
            <Router />
        </DataDebugProvider>
    </AuthProvider>
);

export default App;
