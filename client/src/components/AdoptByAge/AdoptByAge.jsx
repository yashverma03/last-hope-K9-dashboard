import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './AdoptByAge.module.css';
import apiUrl from '../../utils/api';
import 'chartjs-plugin-datalabels';

const AdoptByAge = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/AdoptByAgeData`);
      const data = response.data;
      renderBarChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderBarChart = (data) => {
    if (data.length === 0) {
      return;
    }

    const ageBuckets = data.map((dataPoint) => dataPoint.ageBucket);
    const ages = data.map((dataPoint) => dataPoint.age);

    const barChart = document.getElementById('AdoptByAge-chart').getContext('2d');

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: ageBuckets,
        datasets: [{
          data: ages,
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: 'rgba(75, 192, 192, 0)',
          borderWidth: 1,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            // Formatter to display values with ' days' suffix
            formatter: (value) => `${value} days`,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false, 
            },
            borderColor: 'rgba(0, 0, 0, 0)',
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Avg Time to Adopt</h2>
      <h1 className={styles.subtitle}>45 days</h1>
      <h2 className={styles.heading}>Avg Time to Adopt by Age Bucket</h2>

      <div>
        <canvas id='AdoptByAge-chart' className={styles.chart} />
      </div>

      <p className={styles.text}>Note: Starts at Date of Transport</p>
    </div>
  );
};

export default AdoptByAge;
