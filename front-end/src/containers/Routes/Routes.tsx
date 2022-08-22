// Routing
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../../pages/Home";
import About from "../../pages/About";
import Login from "../../pages/Login";

import Profile from "../../pages/Profile";
import Play from "../../pages/Play";
import Chat from "../../pages/Chat";
import Leaderboard from '../../pages/Leaderboard';

import NotFound from "../../pages/NotFound";

// Authentication
import Guard from "../../containers/Guard";

const Router = () => (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* Routes that have to pass through authentication to be loaded */}
        <Route element={<Guard />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/play" element={<Play />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
