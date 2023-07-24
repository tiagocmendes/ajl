import styled from "styled-components";

export const StyledOuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
`

export const StyledPasswordInput = styled.input`
    padding: 1rem;
    background-color: white;
    border: none;

    &:focus {
        outline: none;
    }
`

export const StyledLoginBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 5rem;
    background-color: #424141;
    color: white;
    margin-top: 2rem;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`