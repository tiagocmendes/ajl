import styled from "styled-components";

export const StyledOuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 90vh;
`

export const StyledTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
`

export const StyledTimer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
`

export const StyledTableScore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    min-height: 80%;
    color: white;
`
export const StyledTableHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #424141;
    padding: 2rem;
`

export const StyledTableTeamName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 40%;
`

export const StyledTableScoreCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 10%;
`

export const StyledTableBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #616060;
    padding: 2rem;
`

export const StyledTableBodyColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${(props) => props.firstTeam ? "flex-end" : "flex-start"};
    width: 45%;
    height: 100%;
`

export const StyledTableBodyDivider = styled.div`
    width: 10%;
    height: 100%;
`