import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getFullOfferState = (state: State) => state[SliceName.Offer];

const getFullOffer = createSelector(
  getFullOfferState,
  (state) => state.loadedFullOffer
);

const getNearOffers = createSelector(
  getFullOfferState,
  (state) => state.loadedNearOffers
);

const getComments = createSelector(
  getFullOfferState,
  (state) => state.loadedComments
);

const getCommentLoadingStatus = createSelector(
  getFullOfferState,
  (state) => state.isNewCommentLoading
);

export { getFullOffer, getNearOffers, getComments, getCommentLoadingStatus };
