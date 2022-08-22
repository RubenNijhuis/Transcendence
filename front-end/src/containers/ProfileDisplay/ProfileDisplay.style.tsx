import styled from "styled-components";

const Container = styled.div`
    margin-bottom: 36px;

    .profile {
        display: flex;

        .user-data {
            padding: 36px;
            border-radius: 6px;
            width: 100%;

            background: rgba(0, 0, 0, 0.1);

            p {
                margin-bottom: 18px;
            }
        }

        img {
            display: block;
            width: 256px;
            height: 256px;
            margin-right: 36px;
            border-radius: 6px;
        }
    }
`;

export { Container };
