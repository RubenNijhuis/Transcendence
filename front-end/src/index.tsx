// React stuff
import React from "react";
import ReactDOM from "react-dom/client";

// Rendered tsx app
import App from "./App";

// App will attach to this node in the dom
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const renderWithStrict = false;

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
