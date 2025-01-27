import { Offer } from '../../types';
import { ThunkApiConfig } from '../types';
import { APIRoute, SliceName } from '../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFavorites = createAsyncThunk<{favoriteOffers: Offer[]; ids: string[]}, undefined, ThunkApiConfig>(
  `${SliceName.Favorites}/fetch`,
  async (_arg, { extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Favorite);
    return {
      favoriteOffers: response.data,
      ids: response.data.map((offer) => offer.id)
    };
  }
);

export const postFavorite = createAsyncThunk<Offer, {id: string; value: boolean}, ThunkApiConfig>(
  `${SliceName.Favorites}/post`,
  async ({id, value}, { extra: api }) => {
    const response = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${Number(value)}`);
    return response.data;
  }
);
