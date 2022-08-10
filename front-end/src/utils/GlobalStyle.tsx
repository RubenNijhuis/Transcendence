// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    body {
        text-rendering: geometricPrecision;
        word-wrap: break-word;
        -webkit-font-feature-settings: "kern","liga","clig","calt";
        font-feature-settings: "kern","liga","clig","calt";
        font-family: Montserrat,Helvetica Neue,Helvetica,sans-serif;
        font-kerning: normal;
        font-weight: 400;
    }

`;

export default GlobalStyle;
