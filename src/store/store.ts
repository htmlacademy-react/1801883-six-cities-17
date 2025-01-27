import { SliceName } from './consts';
import { appSlice } from './app-slice/app-slice';
import { offersSlice } from './offers-slice/offers-slice';
import { favoritesSlice } from './favorites-slice/favorites-slice';
import { fullOfferSlice } from './full-offer-slice/full-offer-slice';
import { userSlice } from './user-slice/user-slice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

const api = createAPI();

const combinedReducer = combineReducers({
  [SliceName.App]: appSlice.reducer,
  [SliceName.Offers]: offersSlice.reducer,
  [SliceName.Favorites]: favoritesSlice.reducer,
  [SliceName.Offer]: fullOfferSlice.reducer,
  [SliceName.User]: userSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api }
    }),
});
