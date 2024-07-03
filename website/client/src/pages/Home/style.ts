import styled from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    color: white;
`;

export const StyledLogo = styled.div`
    animation: fadeIn 2s;
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    & > img {
        height: auto;
        width: 45vw;
    }

    @media (max-width: 400px) {
        & > img {
            height: auto;
            width: 90vw;
        }
    }
`;

export const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 5rem;
`;
