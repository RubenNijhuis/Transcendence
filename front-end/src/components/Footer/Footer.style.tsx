import styled from "styled-components";
import { magicNum } from "../../utils/StylingConstants";

const Container = styled.div`
    color: white;
    padding-bottom: calc(${magicNum} / 2);
    
    .footer {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: 2fr 1fr;

        row-gap: calc(72px / 2);
        align-items: flex-end;

        grid-template-areas: 
        "heading links"
        "rights links"
        ;

        min-height: calc(72px * 2);
        width: calc(100% - 72px);

        margin: auto;
        padding: calc(72px / 2);

        color: white;
        background: rgb(30,30,30);
        border-radius: 6px;

        .heading {
            grid-area: heading;
            font-size: 32px;
            max-width: 14ch;
        }

        .links {
            grid-area: links;

            display: flex;
            flex-direction: row;
            align-items: flex-start;

            height: 100%;

            .inbound {
                margin-right: calc(72px / 2);
            }

            .inbound, .outbound {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                height: 100%;
            }

            a {
                font-size: 18px;
                margin-bottom: calc(72px / 4);
                color: white;
                text-decoration: none;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        .rights {
            grid-area: rights;
        }

        .devs {
            display: flex;
            justify-content: flex-end;
            grid-area: devs;
        }

        p {
            margin-right: calc(72px / 4);

            &:last-child {
                margin-right: 0;
            }
        }
    }
`;

export default Container;