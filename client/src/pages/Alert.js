// src/components/IncidentChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../customCSS/alert.css';
import Layout from '../components/Layout/Layout';
//import '../index.css'


// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Alert = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/v1/data')
      .then((response) => {
        console.log(response.data); // Log the fetched data
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Filter out entries where all values are zero
  const filteredData = data.filter(
    (item) => (item.normal || 0) > 0 || (item.moderate || 0) > 0 || (item.severe || 0) > 0
  );

  // Prepare chart data based on filtered entries
  const chartData = {
    labels: filteredData.map((item) => item.location), // Locations as x-axis labels
    datasets: [
      {
        label: 'Bar Height',
        data: filteredData.map((item) => {
          const counts = {
            normal: item.normal || 0,
            moderate: item.moderate || 0,
            severe: item.severe || 0,
          };

          // Determine the majority and assign the corresponding height
          const majority = Object.keys(counts).reduce((prev, curr) =>
            counts[curr] > counts[prev] ? curr : prev
          );

          // Map category to its corresponding height
          const heightMapping = {
            normal: 2,
            moderate: 4,
            severe: 6,
          };

          return heightMapping[majority];
        }),
        backgroundColor: filteredData.map((item) => {
          // Dynamically set color based on the majority
          const counts = {
            normal: item.normal || 0,
            moderate: item.moderate || 0,
            severe: item.severe || 0,
          };

          const majority = Object.keys(counts).reduce((prev, curr) =>
            counts[curr] > counts[prev] ? curr : prev
          );

          const colorMapping = {
            normal: 'green',
            moderate: 'yellow',
            severe: 'red',
          };

          return colorMapping[majority];
        }),
        barThickness: 18, // Set the bar thickness explicitly (in pixels)
        maxBarThickness: 20, // Ensure the bar doesn't get too thick
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Incident Severity by Location (Bar Heights by Majority)',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Location',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units (Height)',
        },
        ticks: {
          stepSize: 1, // Ensure y-axis units are clear
        },
      },
    },
  };

  return (
    <Layout>
    <div className="incident-chart">
      <h2>Flood Severity Analysis</h2>
      {/* Show loading indicator or the chart */}
      {loading ? (
        <p>Loading data...</p>
      ) : filteredData.length === 0 ? (
        <p>No data available to display.</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
    </Layout>
  );
};

export default Alert;
