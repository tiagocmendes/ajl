import styled from "styled-components";

export const StyledResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledTournamentPhase = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
`

export const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width: 100%;
    margin: 1rem 0;
`

export const StyledBodyRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 2rem;
    background-color: ${(props) => props.isHeader ? "#424141" : props.isEven ? 'transparent' : '#616060'};
    color: white;
    border-top: 2px solid #424141;
    cursor: ${(props) => props.isHeader ? 'select' : 'pointer'};

    &:hover {
        opacity: ${(props) => props.isHeader ? '1' : '0.5'};
    }

    @media (max-width: 700px) {
        flex-direction: column;
        gap: 1rem;
    }
`

export const StyledCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const StyleGameNumberCell = styled(StyledCell)`
    width: 20rem;
`