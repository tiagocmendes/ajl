import styled from "styled-components";

export const ScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-top: 5rem;   
`

export const StyledGroupStages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 5rem;
    margin: 5rem 0;
    @media (max-width: 700px) {
        flex-direction: column;
        gap: 1rem;
    }
`

export const StyledTable = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledTableHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #424141;
    padding: 1rem;
`

export const StyledTableRow = styled.div`
    display: flex;
    flex: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #616060;
    padding: 1rem;
    border-bottom: 1px solid white;
`

export const StyledTableCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8%;
    padding: 1rem 0;
`

export const StyledTeamNameCell = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 55%;
    padding: 1rem;
`

export const StyledKnockOutStage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 2rem 0;

    @media (max-width: 700px) {
        flex-direction: row;
    }
`

export const StyledKnockOutHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2rem;
    background-color: #424141;
    padding: 1rem 0;
    
    @media (max-width: 700px) {
        display: none;
    }
`

export const StyledKnockOutBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 1rem 0rem;
    background-color: #616060;
    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
`

interface ColumnProps {
    isOdd?: boolean
}

export const StyledKnockOutColumn = styled.div<ColumnProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20rem;
    width: 100%;
    padding: 1rem 0rem;
    background-color: ${(props) => props.isOdd ? 'transparent' : '#424141;'};
    @media (max-width: 700px) {
        flex-direction: row;
        gap: 10rem;
    }
`

export const StyledKnockOutGame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const StyledDivider = styled.div`
    margin: 20px 0;
    border: 1px solid #2BB572;
    width: 100%;
`