import { AppRoute, AuthorizationStatus } from '../../consts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { fetchOffers } from '../../store/offers/offers-thunks';
import { checkAuthorization } from '../../store/user/user-thunks';
import Spinner from '../spinner/spinner';
import PrivateRoute from '../private-route/private-route';
import Layout from '../../pages/layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import ErrorPage from '../../pages/error-page/error-page';


export default function App (): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuthorization());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main.Path } element={ <Layout/> }>
            <Route index element={ <MainPage /> }/>
            <Route path={ AppRoute.Login.Path }
              element={
                <PrivateRoute redirectRoute={ AppRoute.Main.Path } isLogin>
                  <LoginPage/>
                </PrivateRoute>
              }
            />
            <Route path={ AppRoute.Offer.Path } element={ <OfferPage/> }/>
            <Route path={ AppRoute.Favorites.Path }
              element={
                <PrivateRoute redirectRoute={ AppRoute.Login.Path }>
                  <FavoritesPage/>
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='*' element={ <ErrorPage /> }/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
