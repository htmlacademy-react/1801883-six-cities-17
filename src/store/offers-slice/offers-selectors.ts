import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getOffersState = (state: State) => state[SliceName.Offers];

const getLoadingStatus = createSelector(
  getOffersState,
  (offers) => offers.loadedOffers.status
);

export { getLoadingStatus };
