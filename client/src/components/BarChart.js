import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    const fetchData = async () => {
        try {
            // Fetch data from the backend (or use WebSocket for live updates)
            const response = await axios.get('/api/getChartData');
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll for updates every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: chartData?.locations || [], // x-axis labels (locations)
        datasets: [
            {
                label: 'Normal',
                data: chartData?.normalValues || [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Moderate',
                data: chartData?.moderateValues || [],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Severe',
                data: chartData?.severeValues || [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return chartData ? <Bar data={data} options={options} /> : <p>Loading data...</p>;
};

export default BarChart;
