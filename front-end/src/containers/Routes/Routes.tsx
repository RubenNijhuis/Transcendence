// Routing
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import About from "../../pages/About";
import Profile from "../../pages/Profile";
import NotFound from "../../pages/NotFound";

// Authentication
import Guard from "../../containers/Guard";

// Misc

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Guard />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
            {/* 404 not found route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
