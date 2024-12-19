import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GauntletWebExplorer from './SearchEngine.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GauntletWebExplorer />
  </React.StrictMode>
);
