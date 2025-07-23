import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiX } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePomodoro, TIMER_TYPES } from '../context/PomodoroContext';

const SettingsModal = () => {
  const { settings, setSettings } = usePomodoro();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...settings });

  const handleOpen = () => {
    setFormData({ ...settings });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <SafeIcon icon={FiSettings} className="text-xl" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pomodoro Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name={TIMER_TYPES.POMODORO}
                      value={formData[TIMER_TYPES.POMODORO]}
                      onChange={handleChange}
                      min="1"
                      max="60"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Short Break (minutes)
                    </label>
                    <input
                      type="number"
                      name={TIMER_TYPES.SHORT_BREAK}
                      value={formData[TIMER_TYPES.SHORT_BREAK]}
                      onChange={handleChange}
                      min="1"
                      max="30"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Long Break (minutes)
                    </label>
                    <input
                      type="number"
                      name={TIMER_TYPES.LONG_BREAK}
                      value={formData[TIMER_TYPES.LONG_BREAK]}
                      onChange={handleChange}
                      min="1"
                      max="60"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Long Break Interval
                    </label>
                    <input
                      type="number"
                      name="longBreakInterval"
                      value={formData.longBreakInterval}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoStartBreaks"
                      name="autoStartBreaks"
                      checked={formData.autoStartBreaks}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoStartBreaks" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Auto-start Breaks
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoStartPomodoros"
                      name="autoStartPomodoros"
                      checked={formData.autoStartPomodoros}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoStartPomodoros" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Auto-start Pomodoros
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 mr-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-600"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsModal;