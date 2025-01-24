import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getFavoritesState = (state: State) => state[SliceName.Favorites];

const getFavorites = createSelector(
  getFavoritesState,
  (favorites) => favorites.loadedFavorites.data
);

const getLoadingStatus = createSelector(
  getFavoritesState,
  (favorites) => favorites.loadedFavorites.status
);

export { getFavorites, getLoadingStatus };
