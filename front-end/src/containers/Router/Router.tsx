// React
import { lazy, Suspense } from "react";

// Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageRoutes from "../../config/PageRoutes";

// Suspense fallback
import FallBackPage from "../FallBackPage";

// Guards
import { AuthGuard } from "../RouteGuards";

// Public Pages
const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));

// Private pages
const ProfilePage = lazy(() => import("../../pages/Profile"));
const ChatPage = lazy(() => import("../../pages/Chat"));
const Leaderboard = lazy(() => import("../../pages/Leaderboard"));
const Pong = lazy(() => import("../../pages/Pong"));
const SelectGame = lazy(() => import("../../pages/SelectGame"));
const SettingsPage = lazy(() => import("../../pages/Settings"));

// 404
const NotFound = lazy(() => import("../../pages/NotFound"));

///////////////////////////////////////////////////////////

const Router = (): JSX.Element => (
    <BrowserRouter>
        <Suspense fallback={<FallBackPage />}>
            <Routes>
                {/* Public routes */}
                <Route path={PageRoutes.login} element={<Login />} />

                {/* Routes that have to pass through authentication to be loaded */}
                <Route element={<AuthGuard />}>
                    <Route path={PageRoutes.home} element={<Home />} />

                    {/* Profile page is rendered in two different ways but same component */}
                    <Route path={PageRoutes.profile} element={<ProfilePage />}>
                        <Route path=":profileName" element={<ProfilePage />} />
                    </Route>

                    <Route
                        path={PageRoutes.settings}
                        element={<SettingsPage />}
                    />

                    {/* Regular private routes */}
                    <Route
                        path={PageRoutes.selectGame}
                        element={<SelectGame />}
                    />

                    <Route path={PageRoutes.pong} element={<Pong />} />

                    <Route path={PageRoutes.chat} element={<ChatPage />} />

                    <Route
                        path={PageRoutes.leaderBoard}
                        element={<Leaderboard />}
                    />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
);

///////////////////////////////////////////////////////////

export default Router;
