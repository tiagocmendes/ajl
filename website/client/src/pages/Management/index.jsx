import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import { StyledOuterDiv, StyledPasswordInput, StyledLoginBtn } from './style';

import { routes } from '../../routes';

const Management = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        const jsonBody = { email, password };
        const response = await axios.post(routes.login, jsonBody);

        if (response.data.token) {
          authContext.isAuthenticated = true;
          authContext.token = response.data.token;
          navigate('/management/matches');
        }
      } catch (error) {
        console.error('Error updating game:', error.message);
      }
    }
  };

  useEffect(() => {
    if (authContext.isAuthenticated) {
      navigate('/management/matches');
    }
  }, [authContext.isAuthenticated, navigate]);

  return (
    <StyledOuterDiv>
      <StyledPasswordInput
        type="text"
        placeholder={'Email'}
        onChange={(e) => handleEmailChange(e)}
      />
      <StyledPasswordInput
        type="password"
        placeholder={'Password'}
        onChange={(e) => handlePasswordChange(e)}
      />
      <StyledLoginBtn onClick={handleLogin}>Login</StyledLoginBtn>
    </StyledOuterDiv>
  );
};

export default Management;
