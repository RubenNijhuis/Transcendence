import styled from "styled-components";

const Container = styled.div`
    height: 72px;
    padding: calc(72px / 4);
    background: rgb(30,30,30);
    color: white;
    
    .logo {
        width: 18px;
        height: 18px;
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
                margin-right: 8px;

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
