import React from 'react';
import ReactDOM from 'react-dom/client';
import { CatalogApp } from './CatalogApp';
import '../design-system/tokens.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CatalogApp />
  </React.StrictMode>
);

