import { AppState } from '../types';
import { CITIES, AuthorizationStatus, LoadingStatus } from '../consts';
import { changeCity, changeSortType } from './action';
import { fetchOffers, fetchFavoriteOffers, checkAuthorization, login, logout } from './api-actions';
import { createReducer } from '@reduxjs/toolkit';
import { sortOffersByCity } from '../utils';

const initialState: AppState = {
  offers: {Paris: [], Cologne: [], Brussels: [], Amsterdam: [], Hamburg: [], Dusseldorf: []},
  currentCity: CITIES[0],
  sortType: 'Popular',
  loadedOffers: {data: [], status: LoadingStatus.Unknown},
  loadedFullOffer: {data: undefined, status: LoadingStatus.Unknown},
  loadedFavoriteOffers: {data: [], status: LoadingStatus.Unknown},
  loadedNearOffers: {data: [], status: LoadingStatus.Unknown},
  loadedComments: {data: [], status: LoadingStatus.Unknown},
  user: {data: undefined, status: LoadingStatus.Unknown},
  authorizationStatus: AuthorizationStatus.Unknown
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.city;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.loadedOffers.status = LoadingStatus.Loading;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.loadedOffers.data = action.payload;
      state.loadedOffers.status = LoadingStatus.Loaded;
      state.offers = sortOffersByCity(state.loadedOffers.data);
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.loadedOffers.status = LoadingStatus.Error;
    })
    .addCase(fetchFavoriteOffers.pending, (state) => {
      state.loadedFavoriteOffers.status = LoadingStatus.Loading;
    })
    .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
      state.loadedFavoriteOffers.data = action.payload;
      state.loadedFavoriteOffers.status = LoadingStatus.Loaded;
    })
    .addCase(fetchFavoriteOffers.rejected, (state) => {
      state.loadedFavoriteOffers.status = LoadingStatus.Error;
    })
    .addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.status = LoadingStatus.Loaded;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuthorization.rejected, (state) => {
      state.user.data = undefined;
      state.user.status = LoadingStatus.Error;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.status = LoadingStatus.Loaded;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(login.rejected, (state) => {
      state.user.data = undefined;
      state.user.status = LoadingStatus.Error;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user.data = undefined;
      state.user.status = LoadingStatus.Unknown;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
