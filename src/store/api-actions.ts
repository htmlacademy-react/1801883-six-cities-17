import { Offer, FullOffer, Comment, User, LoginData } from '../types';
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

export const fetchFullOffer = createAsyncThunk<FullOffer, {id: string}, ThunkApiConfig>(
  'data/fetchFullOffer',
  async ({id}, { extra: api }) => {
    const response = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    return response.data;
  }
);

export const fetchNearOffers = createAsyncThunk<Offer[], {id: string}, ThunkApiConfig>(
  'data/fetchNearOffers',
  async ({id}, { extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return response.data;
  }
);

export const fetchComments = createAsyncThunk<Comment[], {id: string}, ThunkApiConfig>(
  'data/fetchComments',
  async ({id}, { extra: api }) => {
    const response = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return response.data;
  }
);

export const checkAuthorization = createAsyncThunk<User, undefined, ThunkApiConfig>(
  'user/CheckAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    dropToken();
    const response = await api.get<User>(APIRoute.Login);
    saveToken(response.data.token);
    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
    return response.data;
  }
);

export const login = createAsyncThunk<User, LoginData, ThunkApiConfig>(
  'user/login',
  async ({email, password}, { dispatch, extra: api }) => {
    dropToken();
    const response = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(response.data.token);
    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
    return response.data;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Login);
    dropToken();
  }
);
