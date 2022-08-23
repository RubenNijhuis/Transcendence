// Authentication
import AuthProvider from "./utils/AuthContext";

// Misc
import GlobalStyle from "./utils/GlobalStyle";
import Router from "./containers/Routes/Routes";

const App = () => (
    <AuthProvider>
        {/* Global Styling */}
        <GlobalStyle />

        {/* Page routing */}
        <Router />
    </AuthProvider>
);

export default App;
