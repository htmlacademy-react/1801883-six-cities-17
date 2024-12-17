import { CITIES, AppRoute, AuthorizationStatus } from '../../consts';
import { Offer, FullOffer, Cities, User } from '../../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import { sortOffersByCity } from '../../utils';
import PrivateRoute from '../private-route/private-route';
import Layout from '../../pages/layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import ErrorPage from '../../pages/error-page/error-page';

type AppProps = {
  offers: Offer[];
  favoriteOffers: Offer[];
  user?: User;
  getFullOffer: (id: string) => FullOffer | null;
}


export default function App ({offers, favoriteOffers, user, getFullOffer}: AppProps): JSX.Element {
  const [currentCity, setCurrentCity] = useState<Cities>(CITIES[0]);
  const sortedOffersByCity = sortOffersByCity(offers);
  const authorizationStatus = user ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main.Path } element={ <Layout favoriteCount ={ favoriteOffers ? favoriteOffers.length : 0 } user={ user } /> }>
            <Route
              index
              element={ <MainPage offers={ sortedOffersByCity[currentCity] } currentCity={ currentCity } handleTabCLick={ setCurrentCity }/> }
            />
            <Route
              path={ AppRoute.Login.Path }
              element={ <LoginPage /> }
            />
            <Route
              path={ AppRoute.Offer.Path }
              element={
                <OfferPage
                  nearOffers={ offers }
                  getFullOffer={ getFullOffer }
                />
              }
            />
            <Route
              path={ AppRoute.Favorites.Path }
              element={
                <PrivateRoute authorizationStatus={ authorizationStatus } redirectRoute={ AppRoute.Login.Path }>
                  <FavoritesPage favoriteOffers={ favoriteOffers } handleTabCLick={ setCurrentCity }/>
                </PrivateRoute>
              }
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
