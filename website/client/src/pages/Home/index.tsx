import React from 'react';
import Loader from '../../components/Loader';
import Results from '../Results';
import { HomeContainer } from './style';

const Home: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <HomeContainer>
        <Loader />
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <Results />
    </HomeContainer>
  );
};

export default Home;
