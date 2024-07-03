import React, { useContext } from 'react';
import {
  StyledHeader,
  StyledLogo,
  StyledSubHeader,
  StyledSubHeaderOption,
} from './style';
import logo from '../../assets/images/logo.png';
import { OptionTypes } from '../../types/options';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const options = [
    { value: OptionTypes.RESULTS, label: 'Resultados' },
    { value: OptionTypes.SCOREBOARD, label: 'Classificação' },
    {
      value: `${isAuthenticated ? 'management/' : ''}${OptionTypes.TEAMS}`,
      label: 'Equipas',
    },
    { value: OptionTypes.SCORERS, label: 'Marcadores' },
  ];

  const optionIsSelected = (option: string): boolean => {
    return location.pathname === '/' && option === OptionTypes.RESULTS
      ? true
      : location.pathname.includes(option);
  };

  return (
    <>
      <StyledHeader>
        <StyledLogo src={logo} />
      </StyledHeader>

      <StyledSubHeader>
        {options.map((option) => (
          <StyledSubHeaderOption
            onClick={() => navigate('/' + option.value)}
            isSelected={optionIsSelected(option.value)}
          >
            {option.label}
          </StyledSubHeaderOption>
        ))}
      </StyledSubHeader>
    </>
  );
};

export default Header;
