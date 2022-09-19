// Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Route names config
import PageRoutes from "../../config/PageRoutes";

// Public Pages
import Home from "../../pages/Home";
import About from "../../pages/About";

// Private pages
import ProfilePage from "../../pages/Profile";
import Play from "../../pages/Play";
import Chat from "../../pages/Chat";
import Leaderboard from "../../pages/Leaderboard";
import Pong from "../../pages/Pong";
import NewPongGame from "../../pages/NewPongGame";

// 404
import NotFound from "../../pages/NotFound";

// Authentication
import Guard from "../Guard";
import SuccesfulLogin from "../../pages/SuccesfulLogin";
import CreateAccount from "../../pages/CreateAccount";

const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* Public routes */}
            <Route path={PageRoutes.home} element={<Home />} />
            <Route path={PageRoutes.about} element={<About />} />

            {/* Pong debugging */}
            <Route path={PageRoutes.pong} element={<Pong />} />
            <Route path={PageRoutes.newPong} element={<NewPongGame />} />

            {/* Callback route after login */}
            <Route
                path={PageRoutes.authRedirect}
                element={<SuccesfulLogin />}
            />

            {/* TODO: only allow to go to this page if user has jwt */}
            <Route
                path={PageRoutes.createAccount}
                element={<CreateAccount />}
            />

            {/* Routes that have to pass through authentication to be loaded */}
            <Route element={<Guard />}>
                {/* Profile page is rendered in two different ways but same component */}
                <Route path={PageRoutes.profile} element={<ProfilePage />}>
                    <Route path=":userName" element={<ProfilePage />} />
                </Route>

                {/* Regular private routes */}
                <Route path={PageRoutes.play} element={<Play />} />
                <Route path={PageRoutes.chat} element={<Chat />} />
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