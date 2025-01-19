import { AppState } from '../types';
import { CITIES, AuthorizationStatus, LoadingStatus } from '../consts';
import { changeCity, changeSortType, loadFullOffer, loadNearOffers, loadComments, loadUser, setAuthorizationStatus } from './action';
import { fetchOffers, fetchFavoriteOffers } from './api-actions';
import { createReducer } from '@reduxjs/toolkit';
import { sortOffersByCity, sortComments } from '../utils';
import mockData from '../mock/mock-data';

const MAX_NEAR_OFFERS_NUMBER = 3;

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
    .addCase(loadFullOffer, (state, action) => {
      state.loadedFullOffer.data = mockData.getFullOffer(action.payload.id);
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
    .addCase(loadNearOffers, (state) => {
      state.loadedNearOffers.data = [...mockData.offers].slice(0, MAX_NEAR_OFFERS_NUMBER);
    })
    .addCase(loadComments, (state) => {
      state.loadedComments.data = mockData.getComments().sort(sortComments);
    })
    .addCase(loadUser, (state, action) => {
      state.user.data = action.payload.user;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload.status;
    });
});
