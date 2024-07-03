import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import start from '../../../assets/sounds/start.mp3';
import foul from '../../../assets/sounds/foul.mp3';
import goal from '../../../assets/sounds/goal.mp3';

const StyledAudioContainer = styled.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
`;

const AudioPlayer = ({ type }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  }, []);

  const renderSrc = useMemo(() => {
    if (type === 'start') return start;
    if (type === 'goals') return goal;
    else return foul;
  }, [type]);

  return (
    <StyledAudioContainer>
      <audio controls ref={audioRef} style={{ visibility: 'hidden' }}>
        <source src={renderSrc} type="audio/mp3" />
      </audio>
    </StyledAudioContainer>
  );
};

export default AudioPlayer;
