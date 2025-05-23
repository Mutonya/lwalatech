import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardChartProps {
    data: {
        totalRequests: number;
        pendingRequests: number;
        approvedRequests: number;
        rejectedRequests: number;
        commodities: { name: string; requested: number }[];
    };
}

const DashboardChart: React.FC<DashboardChartProps> = ({ data }) => {
    const statusData = {
        labels: ['Pending', 'Approved', 'Rejected'],
        datasets: [
            {
                data: [
                    data.pendingRequests,
                    data.approvedRequests,
                    data.rejectedRequests,
                ],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const commodityData = {
        labels: data.commodities.map((c) => c.name),
        datasets: [
            {
                data: data.commodities.map((c) => c.requested),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ width: '300px' }}>
                <h3>Request Status</h3>
                <Pie data={statusData} />
            </div>
            <div style={{ width: '300px' }}>
                <h3>Commodity Distribution</h3>
                <Pie data={commodityData} />
            </div>
        </div>
    );
};

export default DashboardChart;