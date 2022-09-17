// Authentication
import AuthProvider from "./contexts/AuthContext";

// Misc
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./containers/Router";

// Only for debug purposes
import DataDebugProvider from "./contexts/DebugDataContext";

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
