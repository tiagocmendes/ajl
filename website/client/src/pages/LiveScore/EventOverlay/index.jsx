import React, { useEffect } from 'react';
import {
  StyledOverlay,
  StyledEventContainer,
  StyledSoccerIcon,
  StyledCard,
  StyledGiWhistle,
} from './style';
import AudioPlayer from '../AudioPlayer';
const EventOverlay = ({ overlayControls, event }) => {
  const { showOverlay, setShowOverlay } = overlayControls;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [showOverlay, setShowOverlay]);

  const renderEventType = (type) => {
    if (type === 'goals') return <StyledSoccerIcon />;
    else if (type === 'yellowCards') return <StyledCard isYellow />;
    else return <StyledCard />;
  };

  const renderEventName = () => {
    if (showOverlay.hasOwnProperty('hasStarted')) {
      return (
        <>
          <StyledGiWhistle />
          <span>Início do jogo</span>
          <AudioPlayer type={'start'} />
        </>
      );
    } else if (showOverlay.hasOwnProperty('winner')) {
      return (
        <>
          <StyledGiWhistle />
          <span>Fim do jogo</span>
          <AudioPlayer type={'start'} />
        </>
      );
    } else if (showOverlay.hasOwnProperty('homeTeamEvents')) {
      const event =
        showOverlay.homeTeamEvents[showOverlay.homeTeamEvents.length - 1];
      return (
        <>
          {renderEventType(event.type)}
          <span>
            {event.minute}' - {event.player}
          </span>
          <AudioPlayer type={event.type} />
        </>
      );
    } else if (showOverlay.hasOwnProperty('awayTeamEvents')) {
      const event =
        showOverlay.awayTeamEvents[showOverlay.awayTeamEvents.length - 1];
      return (
        <>
          {renderEventType(event.type)}
          <span>
            {event.minute}' - {event.player}
          </span>
          <AudioPlayer type={event.type} />
        </>
      );
    }
  };

  return (
    <StyledOverlay>
      <StyledEventContainer>{renderEventName()}</StyledEventContainer>
    </StyledOverlay>
  );
};

export default EventOverlay;
