import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getAppState = (state: State) => state[SliceName.App];

const getOffers = createSelector(
  getAppState,
  (app) => app.offers
);

const getCurrentCity = createSelector(
  getAppState,
  (app) => app.currentCity
);

const getSortType = createSelector(
  getAppState,
  (app) => app.sortType
);

export { getOffers, getCurrentCity, getSortType };
