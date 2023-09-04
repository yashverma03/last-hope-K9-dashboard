import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './LivesSaved.css';
import apiUrl from '../../utils/api';

const LivesSaved = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/LivesSavedData`);
      const data = response.data;

      const lineChart = document.getElementById('chart').getContext('2d');

      new Chart(lineChart, {
        type: 'line',
        data: {
          labels: data.map((dataPoint) => dataPoint.year),
          datasets: [{
            data: data.map((dataPoint) => dataPoint.number),
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
                stepSize: 2000,
                callback: (value, index) => {
                  if (index <= 5) {
                    return `${value / 1000}k`;
                  }
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='chart-container'>
      <h2>Lives Saved</h2>
      <h1>10,875</h1>

      <div className='chart-wrapper'>
        <canvas id='chart' />
      </div>
    </div>
  );
};

export default LivesSaved;
