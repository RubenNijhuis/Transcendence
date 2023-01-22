// React
import { lazy, Suspense } from "react";

// Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageRoutes from "../../config/PageRoutes";

// Guards
import { AuthGuard } from "../../containers/RouteGuards";

// Public Page
import Login from "../../pages/Login";

// Private pages
import ProfilePage from "../../pages/Profile";
import ChatPage from "../../pages/Chat";
import Leaderboard from "../../pages/Leaderboard";
import Pong from "../../pages/Pong";
import SelectGame from "../../pages/SelectGame";
import SettingsPage from "../../pages/Settings";

// 404
import NotFound from "../../pages/NotFound";

///////////////////////////////////////////////////////////

const Router = (): JSX.Element => (
    <BrowserRouter>
        <Routes>
            {/* Routes that have to pass through authentication to be loaded */}
            <Route element={<AuthGuard />}>
                <Route path={PageRoutes.login} element={<Login />} />
                <Route path={PageRoutes.home} element={<ProfilePage />} />
                {/* Profile page is rendered in two different ways but same component */}
                <Route path={PageRoutes.profile} element={<ProfilePage />}>
                    <Route path=":profileName" element={<ProfilePage />} />
                </Route>

                <Route path={PageRoutes.settings} element={<SettingsPage />} />

                {/* Regular private routes */}
                <Route path={PageRoutes.selectGame} element={<SelectGame />} />

                <Route path={PageRoutes.pong} element={<Pong />}>
                    <Route path="classic" element={<Pong />} />
                    <Route path="powered" element={<Pong />} />
                    <Route path="watch/:watchId" element={<Pong />} />
                </Route>

                <Route path={PageRoutes.chat} element={<ChatPage />} />

                <Route
                    path={PageRoutes.leaderBoard}
                    element={<Leaderboard />}
                />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

///////////////////////////////////////////////////////////

export default Router;
