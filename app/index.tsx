import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Dashboard</h1>;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
