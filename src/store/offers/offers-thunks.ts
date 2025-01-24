import { Offer } from '../../types';
import { ThunkApiConfig } from '../types';
import { APIRoute, SliceName } from '../consts';
import { setOffers } from '../app/app-slice';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkApiConfig>(
  `${SliceName.Offers}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Offers);

    dispatch(setOffers({offers: response.data}));
    return response.data;
  }
);
