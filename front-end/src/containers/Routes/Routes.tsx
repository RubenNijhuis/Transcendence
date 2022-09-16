// Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PageRoutes as Pages } from "../../config";

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
import Guard from "../../containers/Guard";
import SuccesfulLogin from "../../pages/SuccesfulLogin";
import CreateAccount from "../../pages/CreateAccount";

const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* Public routes */}
            <Route path={Pages.home} element={<Home />} />
            <Route path={Pages.about} element={<About />} />

            {/* Pong debugging */}
            <Route path={Pages.pong} element={<Pong />} />
            <Route path={Pages.newPong} element={<NewPongGame />} />

            {/* Callback route after login */}
            <Route path={Pages.authRedirect} element={<SuccesfulLogin />} />

            {/* TODO: only allow to go to this page if user has jwt */}
            <Route path={Pages.createAccount} element={<CreateAccount />} />

            {/* Routes that have to pass through authentication to be loaded */}
            <Route element={<Guard />}>
                {/* Profile page is rendered in two different ways but same component */}
                <Route path={Pages.profile} element={<ProfilePage />}>
                    <Route path=":id" element={<ProfilePage />} />
                </Route>

                {/* Regular private routes */}
                <Route path={Pages.play} element={<Play />} />
                <Route path={Pages.chat} element={<Chat />} />
                <Route path={Pages.leaderBoard} element={<Leaderboard />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
