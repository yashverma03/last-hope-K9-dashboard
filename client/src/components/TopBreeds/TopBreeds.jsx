import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './TopBreeds.module.css';
import apiUrl from '../../utils/api';
import 'chartjs-plugin-datalabels';


const TopBreeds = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/TopBreedsData`);
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

    const names = data.map((dataPoint) => dataPoint.name);
    const numbers = data.map((dataPoint) => dataPoint.number);

    const barChart = document.getElementById('TopBreeds-chart').getContext('2d');

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          data: numbers,
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
            border: {
              color: '#f8f8f8',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
              // align: 'start',
            },
            border: {
              color: '#f8f8f8',
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Top 10 Primary Breeds (Including Mixes)</h2>

      <div>
        <canvas id='TopBreeds-chart' className={styles.chart} />
      </div>
    </div>
  );
};

export default TopBreeds;
