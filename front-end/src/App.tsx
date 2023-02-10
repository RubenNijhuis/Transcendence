// Styling
import GlobalStyle from "./styles/GlobalStyle";

// Routing
import Router from "./containers/Router";

// Providers
import AuthProvider from "./contexts/AuthContext";
import ModalProvider from "./contexts/ModalContext";
import ChatProvider from "./contexts/ChatContext";
import UserProvider from "./contexts/UserContext";
import SocketProvider from "./contexts/SocketContext";

const App = (): JSX.Element => {
    return (
        <UserProvider>
            <AuthProvider>
                <SocketProvider>
                    <ModalProvider>
                        <ChatProvider>
                            {/* Global Styling */}
                            <GlobalStyle />

                            {/* Page routing */}
                            <Router />
                        </ChatProvider>
                    </ModalProvider>
                </SocketProvider>
            </AuthProvider>
        </UserProvider>
    );
};
export default App;
