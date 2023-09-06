import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './LivesSaved.module.css';
import apiUrl from '../../utils/api';

const LivesSaved = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/LivesSavedData`);
      const data = response.data;
      renderLineChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderLineChart = (data) => {
    if (data.length === 0) {
      return;
    }

    const years = data.map((dataPoint) => dataPoint.year);
    const numbers = data.map((dataPoint) => dataPoint.number);

    const lineChart = document.getElementById('LivesSaved-chart').getContext('2d');

    new Chart(lineChart, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          data: numbers,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 3,
          backgroundColor: 'rgba(173, 216, 230, 0.3)',
          fill: true,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            intersect: true,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
              stepSize: 2000,
              callback: (value, index) => {
                if (index <= 5) {
                  return `${value / 1000}k`;
                }
              },
            },
          },
          x2: {
            position: 'top',
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y2: {
            position: 'right',
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Lives Saved</h2>
      <h1 className={styles.subtitle}>10,875</h1>

      <div className={styles.chartWrapper}>
        <canvas id='LivesSaved-chart' className={styles.chart} />
      </div>

      <div className={styles.verticalLine} />
    </div>
  );
};

export default LivesSaved;
