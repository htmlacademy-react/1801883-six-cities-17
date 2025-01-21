import { AppState } from '../types';
import { CITIES, AuthorizationStatus, LoadingStatus } from '../consts';
import { changeCity, changeSortType } from './action';
import { fetchOffers, fetchFavoriteOffers, fetchFullOffer, fetchNearOffers, fetchComments, postComment, checkAuthorization, login, logout } from './api-actions';
import { createReducer } from '@reduxjs/toolkit';
import { sortOffersByCity, sortComments } from '../utils';

const MAX_NEAR_OFFERS_NUMBER = 3;

const initialState: AppState = {
  offers: {Paris: [], Cologne: [], Brussels: [], Amsterdam: [], Hamburg: [], Dusseldorf: []},
  currentCity: CITIES[0],
  sortType: 'Popular',
  user: {data: undefined, status: LoadingStatus.Unknown},
  authorizationStatus: AuthorizationStatus.Unknown,
  loadedOffers: {data: [], status: LoadingStatus.Unknown},
  loadedFullOffer: {data: undefined, status: LoadingStatus.Unknown},
  loadedNearOffers: {data: [], status: LoadingStatus.Unknown},
  loadedComments: {data: [], status: LoadingStatus.Unknown},
  loadedFavoriteOffers: {data: [], status: LoadingStatus.Unknown},
  isNewCommentLoading: false
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
      state.loadedOffers.data = [];
      state.loadedOffers.status = LoadingStatus.Error;
    })
    .addCase(fetchFullOffer.pending, (state) => {
      state.loadedFullOffer.data = undefined;
      state.loadedFullOffer.status = LoadingStatus.Loading;
    })
    .addCase(fetchFullOffer.fulfilled, (state, action) => {
      state.loadedFullOffer.data = action.payload;
      state.loadedFullOffer.status = LoadingStatus.Loaded;
    })
    .addCase(fetchFullOffer.rejected, (state) => {
      state.loadedFullOffer.data = undefined;
      state.loadedFullOffer.status = LoadingStatus.Error;
    })
    .addCase(fetchNearOffers.pending, (state) => {
      state.loadedNearOffers.status = LoadingStatus.Loading;
    })
    .addCase(fetchNearOffers.fulfilled, (state, action) => {
      state.loadedNearOffers.data = action.payload.slice(0, MAX_NEAR_OFFERS_NUMBER);
      state.loadedNearOffers.status = LoadingStatus.Loaded;
    })
    .addCase(fetchNearOffers.rejected, (state) => {
      state.loadedNearOffers.data = [];
      state.loadedNearOffers.status = LoadingStatus.Error;
    })
    .addCase(fetchComments.pending, (state) => {
      state.loadedComments.status = LoadingStatus.Loading;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.loadedComments.data = action.payload.sort(sortComments);
      state.loadedComments.status = LoadingStatus.Loaded;
    })
    .addCase(fetchComments.rejected, (state) => {
      state.loadedComments.data = [];
      state.loadedComments.status = LoadingStatus.Error;
    })
    .addCase(postComment.pending, (state) => {
      state.isNewCommentLoading = true;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.loadedComments.data = state.loadedComments.data.concat(action.payload).sort(sortComments);
      state.isNewCommentLoading = false;
    })
    .addCase(postComment.rejected, (state) => {
      state.isNewCommentLoading = false;
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
