import { Offer, FullOffer, Comment } from '../../types';
import { ThunkApiConfig, CommentData } from '../types';
import { APIRoute, SliceName } from '../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFullOffer = createAsyncThunk<FullOffer, {id: string}, ThunkApiConfig>(
  `${SliceName.Offer}/fetch`,
  async ({id}, { extra: api }) => {
    const response = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    return response.data;
  }
);

export const fetchNearOffers = createAsyncThunk<Offer[], {id: string}, ThunkApiConfig>(
  `${SliceName.Offer}/nearOffers/fetch`,
  async ({id}, { extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return response.data;
  }
);

export const fetchComments = createAsyncThunk<Comment[], {id: string}, ThunkApiConfig>(
  `${SliceName.Offer}/comments/fetch`,
  async ({id}, { extra: api }) => {
    const response = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return response.data;
  }
);

export const postComment = createAsyncThunk<Comment, {id: string; data: CommentData}, ThunkApiConfig>(
  `${SliceName.Offer}/comments/post`,
  async ({id, data}, { extra: api }) => {
    const response = await api.post<Comment>(`${APIRoute.Comments}/${id}`, data);
    return response.data;
  }
);
