import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './Characteristics.module.css';
import apiUrl from '../../utils/api';

const Characteristics = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/CharacteristicsData`);
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

    const statuses = data.map((dataPoint) => dataPoint.status);
    const yesPercentages = data.map(
      (dataPoint) => (dataPoint.yes / (dataPoint.yes + dataPoint.no + dataPoint.notSure)) * 100
    );
    const noPercentages = data.map(
      (dataPoint) => (dataPoint.no / (dataPoint.yes + dataPoint.no + dataPoint.notSure)) * 100
    );
    const notSurePercentages = data.map(
      (dataPoint) => (dataPoint.notSure / (dataPoint.yes + dataPoint.no + dataPoint.notSure)) * 100
    );

    const barChart = document.getElementById('Characteristics-chart').getContext('2d');

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: statuses,
        datasets: [
          {
            label: 'Does/Are',
            data: yesPercentages,
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
          },
          {
            label: 'Does Not/ Are ...',
            data: noPercentages,
            backgroundColor: 'rgb(105,105,105)',
          },
          {
            label: 'Not Sure',
            data: notSurePercentages,
            backgroundColor: 'rgb(224,224,224)',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
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
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
            },
            border: {
              color: '#f8f8f8',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'black',
              boxWidth: 10,
            },
            itemWidth: 1,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Characteristics</h2>
      <h1 className={styles.subtitle}>Proportion of Dogs that ...</h1>
      <div className={styles.chartWrapper}>
        <canvas id='Characteristics-chart' className={styles.chart} />
      </div>
    </div>
  );
};

export default Characteristics;
