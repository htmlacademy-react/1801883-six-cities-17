import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import MockData from './mock/mock-data';

const mockData = new MockData;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={ mockData.offers }
      favoriteOffers={ mockData.favorites }
      user={ mockData.user }
      getFullOffer={ mockData.getFullOffer }
      getComments={ mockData.getComments }
    />
  </React.StrictMode>
);
