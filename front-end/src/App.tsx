// Styling
import GlobalStyle from "./styles/GlobalStyle";

// Routing
import Router from "./containers/Router";

// Only for debug purposes
import FakeDataProvider from "./contexts/FakeDataContext";

// Providers
import AuthProvider from "./contexts/AuthContext";
import ModalProvider from "./contexts/ModalContext";
import ChatProvider from "./contexts/ChatContext";
import UserProvider from "./contexts/UserContext";
import SocketProvider from "./contexts/SocketContext";

const App = (): JSX.Element => {
    return (
        <UserProvider>
            <FakeDataProvider>
                <AuthProvider>
                    <SocketProvider>
                        {/* TODO: wrapper for providers? */}
                        <ModalProvider>
                            {/* TODO: remove data debug provider */}
                            <ChatProvider>
                                {/* Global Styling */}
                                <GlobalStyle />

                                {/* Page routing */}
                                <Router />
                            </ChatProvider>
                        </ModalProvider>
                    </SocketProvider>
                </AuthProvider>
            </FakeDataProvider>
        </UserProvider>
    );
};
export default App;
