import React from 'react';

import { StyledToggleButton, StyledOption } from './style';


const ToggleButton = ({ value, options, setSelectedOption }) => {
    return (
        <StyledToggleButton>
            {options.map((option) => 
                <StyledOption isActive={option.value === value} onClick={() => setSelectedOption(option.value)}>
                    {option.label}
                </StyledOption>
            )}
        </StyledToggleButton>
    )
}

export default ToggleButton;