import { Cities, Offer } from '../types';
import { createAction } from '@reduxjs/toolkit';


export const changeCity = createAction<{city: Cities}>('app/changeCity');
export const loadOffers = createAction<{loadedOffers: Offer[]}>('data/loadOffers');
