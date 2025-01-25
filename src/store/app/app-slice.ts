import { AppState } from '../types';
import { Offer, Cities, SortingType } from '../../types';
import { CITIES } from '../../consts';
import { SliceName } from '../consts';
import { fetchFavorites, postFavorite } from '../favorites/favorites-thunks';
import { logout } from '../user/user-thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortOffersByCity, updateOffersFavoriteFlag, updateOfferFavoriteFlag } from '../../utils';

const initialState: Pick<AppState, 'offers' | 'currentCity' | 'sortType'> = {
  offers: {Paris: [], Cologne: [], Brussels: [], Amsterdam: [], Hamburg: [], Dusseldorf: []},
  currentCity: CITIES[0],
  sortType: 'Popular',
};


export const appSlice = createSlice({
  name: SliceName.App,
  initialState: initialState,
  reducers: {
    setOffers(state, action: PayloadAction<{offers: Offer[]}>) {
      state.offers = sortOffersByCity(action.payload.offers);
    },
    changeCity(state, action: PayloadAction<{city: Cities}>) {
      state.currentCity = action.payload.city;
    },
    changeSortType(state, action: PayloadAction<{sortType: SortingType}>) {
      state.sortType = action.payload.sortType;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        Object.values(state.offers)
          .forEach((offers) => updateOffersFavoriteFlag(offers, action.payload.ids));
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const {id, city, isFavorite} = action.payload;
        updateOfferFavoriteFlag(state.offers[city.name], id, isFavorite);
      })
      .addCase(logout.fulfilled, (state) => {
        Object.values(state.offers)
          .forEach((offers) => updateOffersFavoriteFlag(offers, []));
      });
  }
});

export const { changeCity, changeSortType, setOffers } = appSlice.actions;
