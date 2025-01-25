import { AppState } from '../types';
import { MAX_NEAR_OFFERS_NUMBER } from '../consts';
import { SliceName, LoadingStatus } from '../consts';
import { fetchFullOffer, fetchNearOffers, fetchComments, postComment } from './full-offer-thunks';
import { postFavorite } from '../favorites/favorites-thunks';
import { sortComments } from '../../utils';
import { createSlice } from '@reduxjs/toolkit';

const initialSLiceState: Pick<AppState, 'loadedFullOffer' | 'loadedNearOffers' | 'loadedComments' | 'isNewCommentLoading'> = {
  loadedFullOffer: {data: undefined, status: LoadingStatus.Unknown},
  loadedNearOffers: {data: [], status: LoadingStatus.Unknown},
  loadedComments: {data: [], status: LoadingStatus.Unknown},
  isNewCommentLoading: false
};


export const fullOfferSlice = createSlice({
  name: SliceName.User,
  initialState: initialSLiceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFullOffer.pending, (state) => {
        state.loadedFullOffer.data = undefined;
        state.loadedFullOffer.status = LoadingStatus.Loading;
      })
      .addCase(fetchFullOffer.fulfilled, (state, action) => {
        state.loadedFullOffer.data = action.payload;
        state.loadedFullOffer.status = LoadingStatus.Loaded;
      })
      .addCase(fetchFullOffer.rejected, (state) => {
        state.loadedFullOffer.data = undefined;
        state.loadedFullOffer.status = LoadingStatus.Error;
      })
      .addCase(fetchNearOffers.pending, (state) => {
        state.loadedNearOffers.status = LoadingStatus.Loading;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.loadedNearOffers.data = action.payload.slice(0, MAX_NEAR_OFFERS_NUMBER);
        state.loadedNearOffers.status = LoadingStatus.Loaded;
      })
      .addCase(fetchNearOffers.rejected, (state) => {
        state.loadedNearOffers.data = [];
        state.loadedNearOffers.status = LoadingStatus.Error;
      })
      .addCase(fetchComments.pending, (state) => {
        state.loadedComments.status = LoadingStatus.Loading;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loadedComments.data = action.payload.sort(sortComments);
        state.loadedComments.status = LoadingStatus.Loaded;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loadedComments.data = [];
        state.loadedComments.status = LoadingStatus.Error;
      })
      .addCase(postComment.pending, (state) => {
        state.isNewCommentLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loadedComments.data = state.loadedComments.data.concat(action.payload).sort(sortComments);
        state.isNewCommentLoading = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isNewCommentLoading = false;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const {id, isFavorite} = action.payload;
        if (id === state.loadedFullOffer.data?.id) {
          state.loadedFullOffer.data.isFavorite = isFavorite;
        }
        const indexOffer = state.loadedNearOffers.data.findIndex((offer) => offer.id === id);
        if (indexOffer !== -1) {
          state.loadedNearOffers.data[indexOffer].isFavorite = isFavorite;
        }
      });
  }
});
