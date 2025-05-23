import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RequestForm from '../components/RequestForm';
import { useDashboardData } from '../hooks/useCommodities';

interface CHWPageProps {
    chwId: string;
    chaId: string;
}

const CHWPage: React.FC<CHWPageProps> = ({ chwId, chaId }) => {
    const { data: dashboardData } = useDashboardData();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Community Health Worker Dashboard
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Request Summary
                </Typography>
                {dashboardData && (
                    <div>
                        <Typography>
                            Total Requests: {dashboardData.totalRequests}
                        </Typography>
                        <Typography>
                            Pending: {dashboardData.pendingRequests} | Approved:{' '}
                            {dashboardData.approvedRequests} | Rejected:{' '}
                            {dashboardData.rejectedRequests}
                        </Typography>
                    </div>
                )}
            </Paper>

            <Paper sx={{ p: 3 }}>
                <RequestForm chwId={chwId} chaId={chaId} />
            </Paper>
        </Box>
    );
};

export default CHWPage;