import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getAppState = (state: State) => state[SliceName.App];

const getOffersByCity = createSelector(
  getAppState,
  (app) => app.offers[app.currentCity]
);

const getCurrentCity = createSelector(
  getAppState,
  (app) => app.currentCity
);

const getSortType = createSelector(
  getAppState,
  (app) => app.sortType
);

export { getOffersByCity, getCurrentCity, getSortType };
