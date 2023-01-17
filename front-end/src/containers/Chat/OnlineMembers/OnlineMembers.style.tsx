import styled from "styled-components";
import { mainColor, magicNum } from "../../../styles/StylingConstants";

const OnlineMembersContainer = styled.div`
    border-bottom: solid 2px ${mainColor};
    height: calc(${magicNum});
    
    ul {
        max-width: 100%;
        overflow-x: scroll;
        padding: calc(${magicNum} / 4);
        display: flex;
        flex-direction: row;
        list-style-type: none;
        gap: calc(${magicNum} / 4);

        li {
            position: relative;

            .asset {
                width: 36px;
                height: 36px;
            }

            &.online {
                &:after {
                    background-color: green;
                }
            }

            &.offline {
                &:after {
                    background-color: red;
                }
            }

            &:after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(50%, -50%);
                background-color: green;
                border-radius: 100px;
                width: 9px;
                height: 9px;
            }
        }
    }
`;

export { OnlineMembersContainer };
