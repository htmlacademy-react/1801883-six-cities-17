import { AppState } from '../types';
import { CITIES } from '../consts';
import { changeCity, loadOffers, loadFullOffer, loadFavoriteOffers, loadNearOffers, loadComments, loadUser, setAuthorizationStatus } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { sortOffersByCity } from '../utils';
import mockData from '../mock/mock-data';


const initialState: AppState = {
  offers: {Paris: [], Cologne: [], Brussels: [], Amsterdam: [], Hamburg: [], Dusseldorf: []},
  currentCity: CITIES[0],
  loadedOffers: [],
  loadedFullOffer: undefined,
  loadedFavoriteOffers: [],
  loadedNearOffers: [],
  loadedComments: [],
  user: undefined,
  authorizationStatus: 'UNKNOWN'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.loadedOffers = action.payload.loadedOffers;
      state.offers = sortOffersByCity(state.loadedOffers);
    })
    .addCase(loadFullOffer, (state, action) => {
      state.loadedFullOffer = mockData.getFullOffer(action.payload.id);
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.loadedFavoriteOffers = action.payload.loadedFavoriteOffers;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.loadedNearOffers = action.payload.loadedNearOffers;
    })
    .addCase(loadComments, (state) => {
      state.loadedComments = mockData.getComments();
    })
    .addCase(loadUser, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload.status;
    });
});
