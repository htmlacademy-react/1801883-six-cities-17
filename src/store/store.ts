import { SliceName } from './consts';
import { appSlice } from './app/app-slice';
import { offersSlice } from './offers/offers-slice';
import { favoritesSlice } from './favorites/favorites-slice';
import { userSlice } from './user/user-slice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

const api = createAPI();

const combinedReducer = combineReducers({
  [SliceName.App]: appSlice.reducer,
  [SliceName.Offers]: offersSlice.reducer,
  [SliceName.Favorites]: favoritesSlice.reducer,
  [SliceName.User]: userSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api }
    }),
});
