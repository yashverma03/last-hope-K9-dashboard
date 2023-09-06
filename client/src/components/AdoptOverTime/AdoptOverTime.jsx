import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './AdoptOverTime.module.css';
import apiUrl from '../../utils/api';

const AdoptOverTime = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/AdoptOverTimeData`);
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

    const lineChart = document.getElementById('AdoptOverTime-chart').getContext('2d');

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
              stepSize: 20,
              max: 60,
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
      <h2 className={styles.title}>Avg Time to Adopt over Time</h2>

      <div className={styles.chartWrapper}>
        <canvas id='AdoptOverTime-chart' className={styles.chart} />
      </div>
    </div>
  );
};

export default AdoptOverTime;
