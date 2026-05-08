import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { apiClient } from '../apiClient';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Tracker = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await apiClient('/mood/trends');
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch trends", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const getMoodValue = (mood) => {
    const values = {
      'Happy': 5,
      'Neutral': 3,
      'Sad': 2,
      'Stressed': 2,
      'Anxiety': 1,
      'Angry': 1,
      'Grief': 0
    };
    return values[mood] || 3;
  };

  const chartData = {
    labels: logs.map(log => new Date(log.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })),
    datasets: [
      {
        fill: true,
        label: 'Mood Level',
        data: logs.map(log => {
           // Combine intrinsic mood value with user's intensity log (1-10) to create a chartable metric.
           // A higher number means a better overall feeling in this simple representation.
           const baseValue = getMoodValue(log.mood); // 0-5
           // If 'good' mood, higher intensity is better. If 'bad', lower intensity is better.
           let score = baseValue;
           if (baseValue >= 3) {
             score += (log.intensity / 5);
           } else {
             score -= (log.intensity / 5);
           }
           return Math.max(0, Math.min(10, score)); // Clamp between 0 and 10
        }),
        borderColor: 'rgba(20, 184, 166, 1)', // Teal 500
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const log = logs[context.dataIndex];
            return `Reported: ${log.mood} (Intensity: ${log.intensity})`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b'
        },
        grid: {
          color: theme === 'dark' ? '#334155' : '#e2e8f0'
        }
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b'
        },
        grid: {
          color: theme === 'dark' ? '#334155' : '#e2e8f0'
        }
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-teal-600" /></div>;
  }

  return (
    <div className="space-y-8 animate-fade-in py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mood Trends</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your emotional journey over the past 7 days.</p>
      </div>

      <div className="glass p-6 rounded-3xl w-full">
        {logs.length > 0 ? (
          <div className="h-[400px]">
            <Line options={options} data={chartData} />
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No mood logs found for the recent period.
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Past Week Details</h2>
        <div className="space-y-4">
          {[...logs].reverse().map((log) => (
            <div key={log._id} className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl flex sm:flex-row flex-col sm:items-center justify-between gap-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-3xl bg-gray-100 dark:bg-slate-700 rounded-full w-12 h-12 flex items-center justify-center">
                  {log.mood === 'Happy' ? '😊' : 
                   log.mood === 'Stressed' ? '😫' : 
                   log.mood === 'Angry' ? '😡' : 
                   log.mood === 'Grief' ? '😢' : 
                   log.mood === 'Anxiety' ? '😰' : '😐'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{log.mood} <span className="text-sm font-normal text-gray-500 ml-2">Intensity: {log.intensity}</span></h4>
                  <p className="text-sm text-gray-500">{new Date(log.createdAt).toLocaleString([], { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
                </div>
              </div>
              {log.notes && (
                <div className="text-sm text-gray-600 dark:text-gray-300 italic max-w-xs truncate">
                  "{log.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
