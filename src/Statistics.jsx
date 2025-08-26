import './Statistics.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
} from 'chart.js';
import { useState } from 'react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
  ArcElement
);

export default function Statistics() {
  const navigate = useNavigate();

  // State to track the selected time period for each chart
  const [lineTimePeriod, setLineTimePeriod] = useState('This Week');
  const [barTimePeriod, setBarTimePeriod] = useState('This Week');
  const [pieTimePeriod, setPieTimePeriod] = useState('This Week');

  // Sample data for different time periods
  const dataByPeriod = {
    'This Week': {
      barData: [40, 50, 60, 70, 80, 90, 100],
      lineData: [20, 40, 60, 80, 100],
      pieData: [80, 20]
    },
    'This Month': {
      barData: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
      lineData: [10, 30, 50, 70, 90],
      pieData: [70, 30]
    },
    'This Year': {
      barData: [10, 30, 50, 70, 90, 100, 120, 140, 160, 180, 200, 220],
      lineData: [5, 20, 50, 80, 100],
      pieData: [60, 40]
    }
  };

// Updated Bar Chart Data with new color scheme
const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Activity Progress',
      data: dataByPeriod[barTimePeriod].barData,
      backgroundColor: (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        return createGradient(ctx, chartArea, 'rgba(0, 240, 255, 0.8)', 'rgba(3, 56, 58, 0.8)');
      },
      borderRadius: 6,
      borderWidth: 0,
      hoverBackgroundColor: 'rgba(0, 240, 255, 0.9)',
    },
  ],
};

// Updated Line Chart Data with new color scheme
const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Anxiety Progress',
      data: dataByPeriod[lineTimePeriod].lineData,
      fill: true,
      backgroundColor: (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        return createGradient(ctx, chartArea, 'rgba(0, 240, 255, 0.5)', 'rgba(3, 56, 58, 0.7)', true);
      },
      borderColor: 'rgba(0, 240, 255, 0.8)',
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: '#03383a',
      pointBorderColor: 'rgba(0, 240, 255, 0.9)',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointHoverBorderWidth: 3,
    },
  ],
};

// Updated Pie Chart Data with new color scheme
const pieData = {
  labels: ['Completed', 'Skipped'],
  datasets: [
    {
      label: 'Activity Status',
      data: dataByPeriod[pieTimePeriod].pieData,
      backgroundColor: [
        (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea, 'rgba(0, 240, 255, 0.7)', 'rgba(3, 56, 58, 0.9)');
        },
        'rgba(0, 240, 255, 0.2)'
      ],
      borderColor: 'rgba(0, 240, 255, 0.5)',
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

// Gradient helper function remains the same
function createGradient(ctx, chartArea, color1, color2, isVertical = false) {
  let gradient;
  if (isVertical) {
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  } else {
    gradient = ctx.createLinearGradient(0, chartArea.bottom, chartArea.right, 0);
  }
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

// Updated chart options for futuristic theme
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          weight: 'bold'
        },
        padding: 20,
        boxWidth: 12,
        boxHeight: 12,
        usePointStyle: true,
      }
    },
    tooltip: {
      backgroundColor: 'rgba(3, 56, 58, 0.9)',
      titleFont: {
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        size: 12
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
      titleColor: 'rgba(255, 255, 255, 0.9)',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth: 1,
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
    }
  }
};

const barOptions = {
  ...commonOptions,
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          weight: 'bold'
        }
      }
    },
    y: {
      grid: {
        color: 'rgb(255, 255, 255)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        stepSize: 20,
        font: {
          weight: 'bold'
        }
      }
    }
  },
  plugins: {
    ...commonOptions.plugins,
    legend: {
      ...commonOptions.plugins.legend,
      position: 'top'
    }
  },
  animation: {
    duration: 2000,
    easing: 'easeOutQuart'
  }
};

const lineOptions = {
  ...commonOptions,
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        stepSize: 20,
        font: {
          weight: 'bold'
        }
      }
    },
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          weight: 'bold'
        }
      }
    }
  },
  elements: {
    line: {
      borderWidth: 3,
      shadowColor: 'rgba(255, 255, 255, 0.4)',
      shadowBlur: 10,
      shadowOffsetY: 5
    },
    point: {
      hoverRadius: 8,
      hoverBorderWidth: 3
    }
  },
  animation: {
    duration: 2000,
    easing: 'easeOutQuart'
  }
};

const pieOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    legend: {
      ...commonOptions.plugins.legend,
      position: 'right'
    }
  },
  cutout: '70%',           // Donut hole
  rotation: -30,           // 3D-style rotation
  borderRadius: 12,        // Smooth edges
  spacing: 6,              // Space between segments
  animation: {
    animateScale: true,
    animateRotate: true
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: 'rgba(0, 240, 255, 0.5)', // Glow-like border color
      hoverBorderColor: 'rgba(0, 240, 255, 1)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 20,
      shadowColor: 'rgba(0, 240, 255, 0.6)',
    }
  }
};


  // Event handlers for dropdown changes
  const handleLineTimePeriodChange = (event) => {
    setLineTimePeriod(event.target.value);
  };

  const handleBarTimePeriodChange = (event) => {
    setBarTimePeriod(event.target.value);
  };

  const handlePieTimePeriodChange = (event) => {
    setPieTimePeriod(event.target.value);
  };

  // Data for percentage display
  const completedPercentage = 80;
  const skippedPercentage = 20;

  return (
    <div className="statistics-page">
      <Sidebar />

      <div className="statistics-content">
        {/* Metric Cards */}
        <div className="metrics-container">
          <div className="metric-card">
            <h4>Anxiety Progress</h4>
            <p>60%</p>
            <p1>This Month</p1>
          </div>
          <div className="metric-card">
            <h4>Total No. of Journals</h4>
            <p>348</p>
            <p1>Completed</p1>
          </div>
          <div className="metric-card">
            <h4>Activity Rate</h4>
            <p>87%</p>
            <p1>Completed</p1>
          </div>
        </div>

        {/* Line Chart */}
        <div className="statistics-chart-section">
          <div className="chart-header">
            <h3>Anxiety Level Progress</h3>
            <select className="dropdown" value={lineTimePeriod} onChange={handleLineTimePeriodChange}>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bar + Pie Chart Section */}
        <div className="statistics-chart-row">
          <div className="chart-left">
            <div className="chart-header">
              <h3>Activity Overview</h3>
              <select className="dropdown" value={barTimePeriod} onChange={handleBarTimePeriodChange}>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="chart-placeholder">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="chart-right">
            <div className="chart-header">
              <h3>Overall Activity Summary</h3>
              <select className="dropdown" value={pieTimePeriod} onChange={handlePieTimePeriodChange}>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="chart-placeholder">
              <Pie data={pieData} options={pieOptions} />
            </div>

            {/* Display Completed and Skipped Percentages */}
            <div className="summary-percentages">
              <p className="completed">Completed: {completedPercentage}%</p>
              <p className="skipped">Skipped: {skippedPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
