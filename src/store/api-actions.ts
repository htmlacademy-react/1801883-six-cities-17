import { Offer, User, LoginData } from '../types';
import { APIRoute } from '../consts';
import { AppDispatch } from '../hooks/use-app-dispatch';
import { State } from '../hooks/use-app-selector';
import { saveToken, dropToken } from '../services/token';
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

export const checkAuthorization = createAsyncThunk<User, undefined, ThunkApiConfig>(
  'user/CheckAuthorizationStatus',
  async (_arg, { extra: api }) => {
    dropToken();
    const response = await api.get<User>(APIRoute.Login);
    saveToken(response.data.token);
    return response.data;
  }
);

export const login = createAsyncThunk<User, LoginData, ThunkApiConfig>(
  'user/login',
  async ({email, password}, { extra: api }) => {
    dropToken();
    const response = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(response.data.token);
    return response.data;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/login',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Login);
    dropToken();
  }
);
