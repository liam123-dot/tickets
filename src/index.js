import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BasketProvider } from './BasketContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Success from './Success';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </BasketProvider>
  </React.StrictMode>
);

reportWebVitals();
