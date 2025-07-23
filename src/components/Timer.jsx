import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePomodoro, TIMER_TYPES } from '../context/PomodoroContext';

const Timer = () => {
  const { 
    currentTimer, 
    timeLeft, 
    isActive, 
    formatTime, 
    toggleTimer, 
    resetTimer, 
    changeTimer 
  } = usePomodoro();

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-4">
        <TimerButton 
          active={currentTimer === TIMER_TYPES.POMODORO}
          onClick={() => changeTimer(TIMER_TYPES.POMODORO)}
        >
          Pomodoro
        </TimerButton>
        <TimerButton 
          active={currentTimer === TIMER_TYPES.SHORT_BREAK}
          onClick={() => changeTimer(TIMER_TYPES.SHORT_BREAK)}
        >
          Short Break
        </TimerButton>
        <TimerButton 
          active={currentTimer === TIMER_TYPES.LONG_BREAK}
          onClick={() => changeTimer(TIMER_TYPES.LONG_BREAK)}
        >
          Long Break
        </TimerButton>
      </div>
      
      <motion.div 
        className="w-64 h-64 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mb-6"
        animate={{ 
          scale: isActive ? [1, 1.05, 1] : 1,
          opacity: isActive ? [1, 0.9, 1] : 1
        }}
        transition={{ 
          duration: 4, 
          ease: "easeInOut",
          repeat: isActive ? Infinity : 0
        }}
      >
        <div className="w-56 h-56 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
          <span className="text-6xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </motion.div>
      
      <div className="flex gap-4">
        <ControlButton onClick={toggleTimer}>
          <SafeIcon icon={isActive ? FiPause : FiPlay} className="text-2xl" />
        </ControlButton>
        <ControlButton onClick={resetTimer}>
          <SafeIcon icon={FiRefreshCw} className="text-2xl" />
        </ControlButton>
      </div>
    </div>
  );
};

const TimerButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-primary-500 text-white shadow-lg' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
    }`}
  >
    {children}
  </button>
);

const ControlButton = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default Timer;