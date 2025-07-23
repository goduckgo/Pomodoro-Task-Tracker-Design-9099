import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiClock, FiList, FiBarChart2 } from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import { PomodoroProvider } from './context/PomodoroContext';
import Timer from './components/Timer';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import SettingsModal from './components/SettingsModal';
import './App.css';

function App() {
  return (
    <PomodoroProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary-600">Pomodoro Tracker</h1>
              <SettingsModal />
            </div>
          </header>
          
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<TimerPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </main>
          
          <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex justify-around">
                <NavLink to="/" icon={FiClock}>Timer</NavLink>
                <NavLink to="/tasks" icon={FiList}>Tasks</NavLink>
                <NavLink to="/stats" icon={FiBarChart2}>Stats</NavLink>
              </div>
            </div>
          </nav>
        </div>
      </Router>
    </PomodoroProvider>
  );
}

const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className={({ isActive }) => 
      `flex flex-col items-center py-3 px-6 transition-colors ${
        location.hash === `#${to}` || (location.hash === '' && to === '/')
          ? 'text-primary-500'
          : 'text-gray-500 hover:text-primary-500'
      }`
    }
  >
    <SafeIcon icon={icon} className="text-xl mb-1" />
    <span className="text-xs">{children}</span>
  </Link>
);

const TimerPage = () => (
  <div className="flex flex-col items-center">
    <Timer />
  </div>
);

const TasksPage = () => (
  <div className="flex flex-col items-center">
    <AddTaskForm />
    <TaskList />
  </div>
);

const StatsPage = () => (
  <div>
    <Stats />
  </div>
);

export default App;