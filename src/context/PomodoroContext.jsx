import { createContext, useContext, useState, useEffect } from 'react';
import { addSeconds, format } from 'date-fns';

const PomodoroContext = createContext();

export const TIMER_TYPES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

export const PomodoroProvider = ({ children }) => {
  // Timer settings (in minutes)
  const [settings, setSettings] = useState({
    [TIMER_TYPES.POMODORO]: 25,
    [TIMER_TYPES.SHORT_BREAK]: 5,
    [TIMER_TYPES.LONG_BREAK]: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  });

  const [currentTimer, setCurrentTimer] = useState(TIMER_TYPES.POMODORO);
  const [timeLeft, setTimeLeft] = useState(settings[TIMER_TYPES.POMODORO] * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    return format(addSeconds(new Date(0), seconds), 'mm:ss');
  };

  // Handle timer tick
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      clearInterval(interval);
      handleTimerComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handle timer completion
  const handleTimerComplete = () => {
    if (currentTimer === TIMER_TYPES.POMODORO) {
      // Increment completed pomodoros
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      
      // Update active task's pomodoro count
      if (activeTaskId) {
        setTasks(tasks.map(task => 
          task.id === activeTaskId 
            ? { ...task, completedPomodoros: (task.completedPomodoros || 0) + 1 } 
            : task
        ));
      }
      
      // Determine if it's time for a long break or short break
      const isLongBreakTime = newCompletedPomodoros % settings.longBreakInterval === 0;
      const nextTimerType = isLongBreakTime ? TIMER_TYPES.LONG_BREAK : TIMER_TYPES.SHORT_BREAK;
      
      setCurrentTimer(nextTimerType);
      setTimeLeft(settings[nextTimerType] * 60);
      setIsActive(settings.autoStartBreaks);
    } else {
      // Break timer completed, switch back to pomodoro
      setCurrentTimer(TIMER_TYPES.POMODORO);
      setTimeLeft(settings[TIMER_TYPES.POMODORO] * 60);
      setIsActive(settings.autoStartPomodoros);
    }
  };

  // Start/pause timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings[currentTimer] * 60);
  };

  // Change timer type
  const changeTimer = (timerType) => {
    setIsActive(false);
    setCurrentTimer(timerType);
    setTimeLeft(settings[timerType] * 60);
  };

  // Task management functions
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description || '',
      estimatedPomodoros: task.estimatedPomodoros || 1,
      completedPomodoros: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const setActiveTask = (id) => {
    setActiveTaskId(id);
  };

  return (
    <PomodoroContext.Provider
      value={{
        currentTimer,
        timeLeft,
        isActive,
        settings,
        formatTime,
        completedPomodoros,
        tasks,
        activeTaskId,
        toggleTimer,
        resetTimer,
        changeTimer,
        setSettings,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        setActiveTask,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => useContext(PomodoroContext);