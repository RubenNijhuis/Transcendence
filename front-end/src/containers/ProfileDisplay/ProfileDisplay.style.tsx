import styled from "styled-components";

const Container = styled.div`
    margin-bottom: 36px;

    .profile {
        display: grid;

        grid-template-columns: 256px 1fr;
        column-gap: 36px;

        .user-data {
            padding: 36px;
            border-radius: 6px;
            width: 100%;

            background: rgba(0, 0, 0, 0.05);

            p {
                margin-bottom: 18px;
            }
        }

        .asset {
            aspect-ratio: 1/1;
            width: 256px;
            height: 256px;
            border-radius: 6px;
        }
    }
`;

export { Container };
