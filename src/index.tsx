import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import MockData from './mock/mock-data';

const mockData = new MockData;
console.log(mockData);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
