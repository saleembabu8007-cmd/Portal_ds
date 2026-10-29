import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkflowProvider } from './core/state/WorkflowContext';
import { App } from './app/App';
import './design-system/tokens.css';
import './components/layout/layout.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    </React.StrictMode>
  );
}

