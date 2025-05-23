import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppQueryClientProvider } from './QueryClientProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppQueryClientProvider>
            <App />
        </AppQueryClientProvider>
    </React.StrictMode>
);