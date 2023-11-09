import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes by default

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0 && !isBreak) {
      setTime(5 * 60); // Set time for a short break
      setIsBreak(true);
    } else if (time === 0 && isBreak) {
      setTime(25 * 60); // Set time for the next pomodoro
      setIsBreak(false);
    }
  }, [time, isBreak]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <div>
        {formatTime()}
      </div>
      <button onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default PomodoroTimer;
