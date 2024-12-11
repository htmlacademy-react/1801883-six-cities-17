import { AppRoute } from '../../consts';
import { Offer, User } from '../../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../../pages/layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import ErrorPage from '../../pages/error-page/error-page';

type AppProps = {
  offers: Offer[];
  favoriteOffers: Offer[] | null;
  user: User | null;
}


export default function App ({offers, favoriteOffers, user}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main.Path } element={ <Layout favoriteCount ={ favoriteOffers ? favoriteOffers.length : 0 } user={ user } /> }>
            <Route
              index
              element={ <MainPage offers={ offers } /> }
            />
            <Route
              path={ AppRoute.Login.Path }
              element={ <LoginPage /> }
            />
            <Route
              path={ AppRoute.Offer.Path }
              element={ <OfferPage nearOffers={ offers } /> }
            />
            <Route
              path={ AppRoute.Favorites.Path }
              element={ <FavoritesPage favoriteOffers={ favoriteOffers } /> }
            />
            <Route
              path='*'
              element={ <ErrorPage /> }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
