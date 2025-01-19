import { Offer } from '../types';
import { APIRoute } from '../consts';
import { AppDispatch } from '../hooks/use-app-dispatch';
import { State } from '../hooks/use-app-selector';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};


export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkApiConfig>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Offers);
    return response.data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, ThunkApiConfig>(
  'data/loadFavoriteOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Favorite);
    return response.data;
  }
);
