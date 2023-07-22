import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ToggleButton from "../../components/ToggleButton";

import Results from "../Results";
import Score from "../Score";

import { HomeContainer, StyledLogo, StyledRow } from "./style";

import logo from '../../assets/images/logo.png';

const OptionTypes = {
    RESULTS: 'results',
    RATING: 'rating'
}

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(OptionTypes.RESULTS);
    
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, [])

    const options = [
        { value: OptionTypes.RESULTS,  label: 'Resultados'}, 
        { value: OptionTypes.RATING, label: 'Classificação'}
    ];

    const showResults = selectedOption === OptionTypes.RESULTS;
    const showRating = selectedOption === OptionTypes.RATING;


    if(isLoading) {
        return (
            <HomeContainer>
                <Loader /> 
            </HomeContainer>
        ) 
    }

    return (
        <HomeContainer>
            <StyledLogo>
                <img alt='Logo' src={logo} />
            </StyledLogo>
            <StyledRow>
                <ToggleButton value={selectedOption} options={options} setSelectedOption={setSelectedOption} />
            </StyledRow>
            {showResults && <Results />}
            {showRating && <Score />}
        </HomeContainer>
    ) 
}

export default Home;