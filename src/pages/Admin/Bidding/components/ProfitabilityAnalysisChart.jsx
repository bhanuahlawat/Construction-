import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitabilityAnalysisChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Profitability Analysis',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profit Margin (%)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProfitabilityAnalysisChart;