import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { usePomodoro } from '../context/PomodoroContext';

const Stats = () => {
  const { tasks, completedPomodoros } = usePomodoro();
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Prepare data for the chart
    const completedTasks = tasks.filter(task => task.completed);
    const activeTasks = tasks.filter(task => !task.completed);
    
    // Group tasks by estimated pomodoros
    const estimatedPomodorosData = {};
    tasks.forEach(task => {
      const key = task.estimatedPomodoros;
      estimatedPomodorosData[key] = (estimatedPomodorosData[key] || 0) + 1;
    });
    
    // Create chart options
    setChartOptions({
      title: {
        text: 'Pomodoro Stats',
        left: 'center',
        textStyle: {
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Task Status',
          type: 'pie',
          radius: '50%',
          data: [
            { value: completedTasks.length, name: 'Completed Tasks' },
            { value: activeTasks.length, name: 'Active Tasks' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            color: function(params) {
              const colorList = ['#0ea5e9', '#ec4899'];
              return colorList[params.dataIndex];
            }
          }
        }
      ]
    });
  }, [tasks, completedPomodoros]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Pomodoros" value={completedPomodoros} />
        <StatCard title="Completed Tasks" value={tasks.filter(task => task.completed).length} />
        <StatCard title="Active Tasks" value={tasks.filter(task => !task.completed).length} />
      </div>
      
      {tasks.length > 0 && (
        <div className="h-64">
          <ReactECharts option={chartOptions} style={{ height: '100%' }} />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
    <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);

export default Stats;