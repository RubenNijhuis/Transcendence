import React from "react";
import styled from "styled-components";
import { darkTextColor, magicNum } from "../../utils/StylingConstants";

const StyledH1 = styled.h1`
    font-size: 54.93px;
    margin-bottom: calc(${magicNum} / 2 * 1.5);
    color: ${darkTextColor};
`;

const StyledH2 = styled.h2`
    font-size: 43.95px;
    margin-bottom: calc(${magicNum} / 2);
    color: ${darkTextColor};
`;

const StyledH3 = styled.h3`
    font-size: 35.16px;
    margin-bottom: calc(${magicNum} / 3);
    color: ${darkTextColor};
`;

const StyledH4 = styled.h4`
    font-size: 28.13px;
    margin-bottom: calc(${magicNum} / 4);
    color: ${darkTextColor};
`;

const StyledH5 = styled.h5`
    font-size: 22.5px;
    margin-bottom: calc(${magicNum} / 6);
    color: ${darkTextColor};
`;

const StyledH6 = styled.h6`
    font-size: 18px;
    margin-bottom: calc(${magicNum} / 8);
    color: ${darkTextColor};
`;

export { StyledH1, StyledH2, StyledH3, StyledH4, StyledH5, StyledH6 };
