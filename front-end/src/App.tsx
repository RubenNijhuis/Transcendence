// Authentication
import AuthProvider from "./utils/AuthContext";

// Misc
import GlobalStyle from "./utils/GlobalStyle";
import Router from "./containers/Routes/Routes";

// Only for debug purposes
import DataDebugProvider from "./utils/DebugDataContext";

const App = () => (
    <AuthProvider>
        <DataDebugProvider>
            {/* Global Styling */}
            <GlobalStyle />

            {/* Page routing */}
            <Router />
        </DataDebugProvider>
    </AuthProvider>
);

export default App;
