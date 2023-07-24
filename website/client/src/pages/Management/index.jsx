import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

import { StyledOuterDiv, StyledPasswordInput, StyledLoginBtn } from './style';

const Management = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const secretKey = 'my_secret_key';

    const handleInputChange = (e) => {
      setPassword(e.target.value);
    }

    const decryptText = (encryptedText) => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    
    const handleLogin = () => {
      const decryptedText = decryptText('U2FsdGVkX18zaEh37Lg9vetdFJOJvvNPkcDphqyIJKVWS/s7GZAPVQOVj36kVbf6');
      if(password === decryptedText) {
        setIsAuthenticated(true);
      }
    }

    useEffect(() => {
      if(isAuthenticated) {
        navigate('/management/games');
      }
    }, [isAuthenticated, navigate])


    return (
      <StyledOuterDiv>
        <StyledPasswordInput type="password"  placeholder={'Password'} onChange={(e) => handleInputChange(e)} />
          <StyledLoginBtn onClick={handleLogin}>
              Login
          </StyledLoginBtn>
      </StyledOuterDiv>
    );
    
}

export default Management;