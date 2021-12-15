import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';
import { Flex, Heading, Text } from '@chakra-ui/react';

const CountdownTimer = ({ dropDate }) => {
  const [timerString, setTimerString] = useState('');

  useEffect(() => {
    // Counts down every second
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeDiff = dropDate - currentDate;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimerString(`${days}days ${hours}hrs ${minutes}mins ${seconds}secs`);

      if (timeDiff < 0) {
        // If time difference is less than 0, remove countdown timer
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Flex
      className="timer-container"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      p={4}
    >
      <Heading className="timer-header" size="lg">
        Drops In
      </Heading>
      {timerString && (
        <Text className="timer-value">{`⏰ ${timerString}`}</Text>
      )}
    </Flex>
  );
};

export default CountdownTimer;
