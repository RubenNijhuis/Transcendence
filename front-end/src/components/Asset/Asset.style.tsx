import styled from "styled-components";

const Container = styled.div`
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

export { Container };
