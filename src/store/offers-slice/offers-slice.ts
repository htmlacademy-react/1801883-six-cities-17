import { AppState } from '../types';
import { SliceName, LoadingStatus } from '../consts';
import { fetchOffers } from './offers-thunks';
import { fetchFavorites, postFavorite } from '../favorites-slice/favorites-thunks';
import { logout } from '../user-slice/user-thunks';
import { createSlice } from '@reduxjs/toolkit';
import { updateOffersFavoriteFlag, updateOfferFavoriteFlag } from '../../utils';

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
        updateOfferFavoriteFlag(state.loadedOffers.data, id, isFavorite);
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        updateOffersFavoriteFlag(state.loadedOffers.data, action.payload.ids);
      })
      .addCase(logout.fulfilled, (state) => {
        updateOffersFavoriteFlag(state.loadedOffers.data, []);
      });
  },
});
