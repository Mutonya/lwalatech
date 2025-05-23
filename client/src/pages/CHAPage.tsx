import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RequestList from '../components/RequestList';
import DashboardChart from '../components/DashboardChart';
import {
    useRequestsByCHA,
    useUpdateRequestStatus,
} from '../hooks/useCommodities';
import { useDashboardData } from '../hooks/useCommodities';

interface CHAPageProps {
    chaId: string;
}

const CHAPage: React.FC<CHAPageProps> = ({ chaId }) => {
    const { data: requests, isLoading } = useRequestsByCHA(chaId);
    const { mutate: updateStatus } = useUpdateRequestStatus();
    const { data: dashboardData } = useDashboardData();

    const handleStatusChange = (
        requestId: number,
        status: 'approved' | 'rejected'
    ) => {
        updateStatus({ requestId, status });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Community Health Assistant Dashboard
            </Typography>

            {dashboardData && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Overview
                    </Typography>
                    <DashboardChart data={dashboardData} />
                </Paper>
            )}

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Pending Requests
                </Typography>
                <RequestList
                    requests={requests || []}
                    chaId={chaId}
                    onStatusChange={handleStatusChange}
                    loading={isLoading}
                />
            </Paper>
        </Box>
    );
};

export default CHAPage;