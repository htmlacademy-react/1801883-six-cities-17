import { AppRoute } from '../../consts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadUser, setAuthorizationStatus } from '../../store/action';
import { fetchOffers, fetchFavoriteOffers } from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import Layout from '../../pages/layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import ErrorPage from '../../pages/error-page/error-page';
import mockData from '../../mock/mock-data';


export default function App (): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser({user: mockData.user}));
    dispatch(setAuthorizationStatus({status: 'AUTH'}));

    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main.Path } element={ <Layout/> }>
            <Route index element={ <MainPage /> }/>
            <Route path={ AppRoute.Login.Path } element={ <LoginPage/> }/>
            <Route path={ AppRoute.Offer.Path } element={ <OfferPage/> }/>
            <Route path={ AppRoute.Favorites.Path }
              element={
                <PrivateRoute redirectRoute={ AppRoute.Login.Path }>
                  <FavoritesPage/>
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
