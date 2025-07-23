import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiTrash2, FiPlay, FiClock } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePomodoro } from '../context/PomodoroContext';

const TaskList = () => {
  const { 
    tasks, 
    activeTaskId, 
    toggleTaskCompletion, 
    deleteTask, 
    setActiveTask 
  } = usePomodoro();
  
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
          <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
          <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredTasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  isActive={task.id === activeTaskId}
                  onToggleComplete={() => toggleTaskCompletion(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onSetActive={() => setActiveTask(task.id)}
                />
              ))}
            </ul>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="p-6 text-center text-gray-500"
            >
              No tasks {filter !== 'all' && `(${filter})`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TaskItem = ({ task, isActive, onToggleComplete, onDelete, onSetActive }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      className={`p-4 flex items-center justify-between ${
        isActive ? 'bg-primary-50 dark:bg-primary-900/20' : ''
      } ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggleComplete}
          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
            task.completed 
              ? 'bg-primary-500 border-primary-500' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {task.completed && <SafeIcon icon={FiCheck} className="text-white" />}
        </button>
        
        <div className="flex flex-col">
          <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </span>
          {task.description && (
            <span className="text-sm text-gray-500 dark:text-gray-400">{task.description}</span>
          )}
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <SafeIcon icon={FiClock} className="mr-1" />
            <span>{task.completedPomodoros}/{task.estimatedPomodoros} pomodoros</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {!task.completed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSetActive}
            disabled={isActive}
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              isActive 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiPlay} />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-500 dark:bg-gray-700 dark:text-gray-300"
        >
          <SafeIcon icon={FiTrash2} />
        </motion.button>
      </div>
    </motion.li>
  );
};

const FilterButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded-md transition-all ${
      active 
        ? 'bg-primary-500 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
    }`}
  >
    {children}
  </button>
);

export default TaskList;