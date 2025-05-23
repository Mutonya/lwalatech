import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 3,
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Commodity Request System
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Welcome to the Community Health Worker Commodity Management System
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/chw"
                    >
                        CHW Portal
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/cha"
                    >
                        CHA Portal
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;