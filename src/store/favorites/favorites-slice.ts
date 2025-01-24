import { AppState } from '../types';
import { SliceName, LoadingStatus } from '../consts';
import { fetchFavorites } from './favorites-thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialSLiceState: Pick<AppState, 'loadedFavorites'> = {
  loadedFavorites: {data: [], status: LoadingStatus.Unknown},
};


export const favoritesSlice = createSlice({
  name: SliceName.Favorites,
  initialState: initialSLiceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loadedFavorites.status = LoadingStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loadedFavorites.data = action.payload;
        state.loadedFavorites.status = LoadingStatus.Loaded;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loadedFavorites.data = [];
        state.loadedFavorites.status = LoadingStatus.Error;
      });
  },
});
