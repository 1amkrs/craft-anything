import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CraftProvider } from './context/CraftContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CraftProvider>
      <App />
    </CraftProvider>
  </React.StrictMode>
);
