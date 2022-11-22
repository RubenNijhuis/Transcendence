// React stuff
import React from "react";
import ReactDOM from "react-dom/client";

// Rendered tsx app
import App from "./app";
import { renderWithStrict } from "./config/DevEnv";

// App will attach to this node in the dom
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <>
        {renderWithStrict ? (
            <React.StrictMode>
                <App />
            </React.StrictMode>
        ) : (
            <App />
        )}
    </>
);
