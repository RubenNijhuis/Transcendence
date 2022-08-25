// Routing
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../../pages/Home";
import About from "../../pages/About";
import Login from "../../pages/Login";

import ProfilePage from "../../pages/Profile";
import Play from "../../pages/Play";
import Chat from "../../pages/Chat";
import Leaderboard from "../../pages/Leaderboard";

import NotFound from "../../pages/NotFound";

// Authentication
import Guard from "../../containers/Guard";
import Pong from "../../pages/Pong";

const Router = () => (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        <Route path="/pong" element={<Pong />} />

        {/* Routes that have to pass through authentication to be loaded */}
        <Route element={<Guard />}>
            {/* Profile page is rendered in two different ways but same component */}
            <Route path="profile">
                <Route path=":id" element={<ProfilePage />} />
                <Route path="me" element={<ProfilePage />} />
            </Route>

            <Route path="/play" element={<Play />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
