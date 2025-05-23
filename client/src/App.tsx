import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CHWPage from './pages/CHWPage';
import CHAPage from './pages/CHAPage';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

// Mock user data - in a real app, this would come from authentication
const mockUsers = {
    chw: {
        id: 'chw-1',
        name: 'John Doe',
        role: 'chw',
        supervisorId: 'cha-1',
    },
    cha: {
        id: 'cha-1',
        name: 'Jane Smith',
        role: 'cha',
    },
};

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/chw"
                            element={
                                <CHWPage chwId={mockUsers.chw.id} chaId={mockUsers.chw.supervisorId} />
                            }
                        />
                        <Route
                            path="/cha"
                            element={<CHAPage chaId={mockUsers.cha.id} />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;