import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePomodoro } from '../context/PomodoroContext';

const AddTaskForm = () => {
  const { addTask } = usePomodoro();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedPomodoros: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'estimatedPomodoros' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    addTask(formData);
    setFormData({
      title: '',
      description: '',
      estimatedPomodoros: 1
    });
    setIsFormOpen(false);
  };

  return (
    <div className="w-full max-w-md mb-6">
      {!isFormOpen ? (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300"
        >
          <SafeIcon icon={FiPlus} className="text-primary-500" />
          <span>Add Task</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Add New Task</h3>
            <button 
              onClick={() => setIsFormOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Task Name *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="estimatedPomodoros" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estimated Pomodoros
              </label>
              <input
                type="number"
                id="estimatedPomodoros"
                name="estimatedPomodoros"
                value={formData.estimatedPomodoros}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 mr-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-600"
              >
                Add Task
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default AddTaskForm;