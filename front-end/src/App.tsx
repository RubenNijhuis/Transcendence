import { Fragment } from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Misc
import GlobalStyle from "./utils/GlobalStyle";

const App = () => {
    return (
        <Fragment>
            {/* Global Styling */}
            <GlobalStyle />

            {/* Routing */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* 404 not found route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Fragment>
    );
};

export default App;
