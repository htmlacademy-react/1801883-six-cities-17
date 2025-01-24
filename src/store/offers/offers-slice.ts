import { AppState } from '../types';
import { SliceName, LoadingStatus } from '../consts';
import { fetchOffers } from './offers-thunks';
import { postFavorite } from '../favorites/favorites-thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialSLiceState: Pick<AppState, 'loadedOffers'> = {
  loadedOffers: {data: [], status: LoadingStatus.Unknown},
};


export const offersSlice = createSlice({
  name: SliceName.Offers,
  initialState: initialSLiceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loadedOffers.status = LoadingStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loadedOffers.data = action.payload;
        state.loadedOffers.status = LoadingStatus.Loaded;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loadedOffers.data = [];
        state.loadedOffers.status = LoadingStatus.Error;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const {id, isFavorite} = action.payload;
        const indexOffer = state.loadedOffers.data.findIndex((offer) => offer.id === id);
        state.loadedOffers.data[indexOffer].isFavorite = isFavorite;
      });
  },
});
