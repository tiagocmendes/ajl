import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  height: 150px;
  background-color: #2bb572;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 48px;
  font-weight: 700;
`;

export const StyledLogo = styled.img`
  width: 250px;
  height: auto;
`;

export const StyledSubHeader = styled.div`
  width: 100%;
  height: 75px;
  background-color: #1a6b44;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 5rem;
  box-sizing: border-box;
  gap: 1.5rem;

  @media (max-width: 715px) {
    padding: 0 1.5rem;
    font-size: 0.75rem;
  }
`;

interface OptionProps {
  isSelected: boolean;
}

export const StyledSubHeaderOption = styled.span<OptionProps>`
  font-size: 1rem;
  width: 150px;
  position: relative;
  display: inline-block;
  text-align: center;
  color: ${(props) => (props.isSelected ? '#75faba' : 'white')};
  transition: color 0.3s, opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${(props) => (props.isSelected ? '-10px' : '-10px')};
    width: ${(props) => (props.isSelected ? '100%' : '0')};
    height: 2px;
    background-color: ${(props) =>
      props.isSelected ? '#75faba' : 'transparent'};
    transition: width 0.3s, background-color 0.3s;
  }

  &:hover {
    cursor: pointer;
    ${(props) => !props.isSelected && `opacity: 0.8;`}
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;
