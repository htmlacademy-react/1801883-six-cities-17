import { AppState } from '../types';
import { CITIES } from '../consts';
import { changeCity, loadOffers } from './action';
import { createReducer } from '@reduxjs/toolkit';


const initialState: AppState = {
  currentCity: CITIES[0],
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload.loadedOffers;
    });
});
