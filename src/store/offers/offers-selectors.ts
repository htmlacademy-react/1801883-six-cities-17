import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getOffersState = (state: State) => state[SliceName.Offers];

const getLoadedOffers = createSelector(
  getOffersState,
  (offers) => offers.loadedOffers.data
);

const getLoadingStatus = createSelector(
  getOffersState,
  (offers) => offers.loadedOffers.status
);

export { getLoadedOffers, getLoadingStatus };
