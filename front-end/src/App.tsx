// Authentication
import AuthProvider from "./contexts/AuthContext";

// Misc
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./containers/Router";

// Only for debug purposes
import FakeDataProvider from "./contexts/FakeDataContext";
import ModalProvider from "./contexts/ModalContext";

const App = () => (
    <AuthProvider>
        {/* TODO: wrapper for providers? */}
        <ModalProvider>
            {/* TODO: remove data debug provider */}
            <FakeDataProvider>
                {/* Global Styling */}
                <GlobalStyle />

                {/* Page routing */}
                <Router />
            </FakeDataProvider>
        </ModalProvider>
    </AuthProvider>
);

export default App;
