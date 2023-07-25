import styled from "styled-components";

export const StyledOuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 90vh;
`

export const StyledTeamNamesRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    width: 100%;
`

export const StyledTeamNameCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30%;
`

export const StyledTeamScoreCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 10%;
`

export const StyledStartGameBtn = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 2rem 10rem;
background-color: white;
color: #2BB572;
cursor: pointer;
&:hover {
    opacity: 0.8;
}
`

export const StyledScorersRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    width: 100%;
    gap: 20rem;
`

export const ScorerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`

export const StyledScorerInput = styled.input`
    padding: 1rem 5rem;
    background-color: white;
    border: none;
    &:focus {
        outline: none;
    }
    text-transform:uppercase;
`

export const StyledAddBtn = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: white;
color: #2BB572;
cursor: pointer;
&:hover {
    opacity: 0.8;
}
width: 100%;
padding: 1rem 0;
`


export const StyledRemoveBtn = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: red;
color: white;
cursor: pointer;
&:hover {
    opacity: 0.8;
}
width: 100%;
padding: 1rem 0;
`