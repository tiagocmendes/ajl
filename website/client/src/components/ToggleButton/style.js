import styled from "styled-components";

export const StyledToggleButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 0.2rem;
    border-radius: 0.5rem;
`

export const StyledOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 3rem;
    background-color: ${(props) => props.isActive ? '#2BB572' : 'transparent'};
    color: ${(props) => props.isActive ? 'white' : '#2BB572;'};
    border-radius: 0.5rem;
    margin-bottom: 0.03rem;
    cursor: pointer;

    @media (max-width: 400px) {
        padding: 0.5rem 1rem; 
    }
`