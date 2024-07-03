import React, { useEffect, useState } from 'react';

const Timer = ({ startTimestamp, setCurrentMinute }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, []);

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const startTime = new Date(Number(startTimestamp)).getTime();
    const timeDifference = currentTime - startTime;

    if (timeDifference <= 0) {
      // Handle when the start time is in the future
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    // const oneDay = oneHour * 24;

    // const days = Math.floor(timeDifference / oneDay);
    // const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
    const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  useEffect(() => {
    if (setCurrentMinute !== undefined) setCurrentMinute(timeRemaining.minutes);
  }, [timeRemaining, setCurrentMinute]);

  return (
    <span style={{ color: 'red' }}>
      {timeRemaining.minutes}:{timeRemaining.seconds}'
    </span>
  );
};

export default Timer;
