import { AppRoute, AuthorizationStatus } from '../../consts';
import { Offer, FullOffer, User, Comment } from '../../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadOffers } from '../../store/action';
import PrivateRoute from '../private-route/private-route';
import Layout from '../../pages/layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import ErrorPage from '../../pages/error-page/error-page';
import mockData from '../../mock/mock-data';

type AppProps = {
  favoriteOffers: Offer[];
  user?: User;
  getFullOffer: (id: string) => FullOffer | null;
  getComments: () => Comment[];
}


export default function App ({favoriteOffers, user, getFullOffer, getComments}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers({loadedOffers: mockData.offers}));
  }, [dispatch]);

  const authorizationStatus = user ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main.Path } element={ <Layout favoriteCount ={ favoriteOffers ? favoriteOffers.length : 0 } user={ user } /> }>
            <Route index element={ <MainPage /> }/>
            <Route path={ AppRoute.Login.Path } element={ <LoginPage/> }/>
            <Route path={ AppRoute.Offer.Path }
              element={
                <OfferPage
                  authorizationStatus={ authorizationStatus }
                  getFullOffer={ getFullOffer }
                  getComments={ getComments }
                />
              }
            />
            <Route path={ AppRoute.Favorites.Path }
              element={
                <PrivateRoute authorizationStatus={ authorizationStatus } redirectRoute={ AppRoute.Login.Path }>
                  <FavoritesPage favoriteOffers={ favoriteOffers }/>
                </PrivateRoute>
              }
            />
            <Route path='*' element={ <ErrorPage /> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
