// Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Route names config
import PageRoutes from "../../config/PageRoutes";

// Public Pages
import Home from "../../pages/Home";

// Private pages
import ProfilePage from "../../pages/Profile";
import Play from "../../pages/Play";
import ChatPage from "../../pages/Chat";
import Leaderboard from "../../pages/Leaderboard";
import Pong from "../../pages/Pong";
import NewPongGame from "../../pages/NewPongGame";

// Authentication
import { AuthGuard } from "../RouteGuards";

// 404
import NotFound from "../../pages/NotFound";

const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* Public routes */}
            <Route path={PageRoutes.home} element={<Home />} />

            {/* Pong debugging */}
            <Route path={PageRoutes.pong} element={<Pong />} />
            <Route path={PageRoutes.newPong} element={<NewPongGame />} />

            {/* Routes that have to pass through authentication to be loaded */}
            <Route element={<AuthGuard />}>
                {/* Profile page is rendered in two different ways but same component */}
                <Route path={PageRoutes.profile} element={<ProfilePage />}>
                    <Route path=":profileName" element={<ProfilePage />} />
                </Route>

                {/* Regular private routes */}
                <Route path={PageRoutes.play} element={<Play />} />
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

export default Router;
