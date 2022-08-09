import styled from "styled-components";

const Container = styled.div`
    padding-top: calc(72px / 2);
    
    .bar {
        height: 72px;
        width: calc(100% - 72px);
        margin: auto;
        padding: calc(72px / 4);

        color: white;
        background: rgb(30,30,30);
        border-radius: 6px;
    }
    
    .logo {
        width: calc(72px / 4);
        height: calc(72px / 4);
        border-radius: 100px;
        background: white;
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        ul {
            display: flex;
            list-style-type: none;

            li {
                margin-right: calc(72px / 8);

                a {
                    color: white;
                    text-decoration: none;
                    &:visited {
                        color: white;
                    }

                    &:last {
                        margin-right: none;
                    }
                }
            }
        }
    }
`;

export default Container;
