import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BasketProvider } from './BasketContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BasketProvider>
  </React.StrictMode>
);

reportWebVitals();
