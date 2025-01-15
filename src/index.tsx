import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/store';
import MockData from './mock/mock-data';

const mockData = new MockData;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App
        offers={ mockData.offers }
        favoriteOffers={ mockData.favorites }
        user={ mockData.user }
        getFullOffer={ mockData.getFullOffer }
        getComments={ mockData.getComments }
      />
    </Provider>
  </React.StrictMode>
);
