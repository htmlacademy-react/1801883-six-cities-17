import { Cities, Offer, User, Authorization } from '../types';
import { createAction } from '@reduxjs/toolkit';


export const changeCity = createAction<{city: Cities}>('app/changeCity');

export const loadOffers = createAction<{loadedOffers: Offer[]}>('data/loadOffers');

export const loadFullOffer = createAction<{id: string}>('data/loadFullOffer');

export const loadFavoriteOffers = createAction<{loadedFavoriteOffers: Offer[]}>('data/loadFavoriteOffers');

export const loadNearOffers = createAction<{loadedNearOffers: Offer[]}>('data/loadNearOffers');

export const loadComments = createAction<{id: string}>('data/loadComments');

export const loadUser = createAction<{user: User}>('data/loadUser');

export const setAuthorizationStatus = createAction<{status: Authorization}>('data/loadAuthorizationStatus');
