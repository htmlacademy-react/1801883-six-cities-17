import { AppState } from '../types';
import { CITIES } from '../consts';
import { changeCity, loadOffers } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { sortOffersByCity } from '../utils';


const initialState: AppState = {
  loadedOffers: [],
  offers: {Paris: [], Cologne: [], Brussels: [], Amsterdam: [], Hamburg: [], Dusseldorf: []},
  currentCity: CITIES[0],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.loadedOffers = action.payload.loadedOffers;
      state.offers = sortOffersByCity(state.loadedOffers);
    });
});
