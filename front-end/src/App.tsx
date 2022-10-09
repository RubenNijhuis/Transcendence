// Authentication
import AuthProvider from "./contexts/AuthContext";

// Misc
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./containers/Router";

// Only for debug purposes
import FakeDataProvider from "./contexts/FakeDataContext";
import ModalProvider from "./contexts/ModalContext";
import ChatProvider from "./contexts/ChatContext";

const App = () => (
    <AuthProvider>
        {/* TODO: wrapper for providers? */}
        <ModalProvider>
            {/* TODO: remove data debug provider */}
            <FakeDataProvider>
                <ChatProvider>
                    {/* Global Styling */}
                    <GlobalStyle />

                    {/* Page routing */}
                    <Router />
                </ChatProvider>
            </FakeDataProvider>
        </ModalProvider>
    </AuthProvider>
);

export default App;
