import axios, {AxiosResponse} from 'axios';

import {UserInfo, GetLikesRes, CreateLikeReq, DeleteLike} from './user.type';

const BASE_URL = '/user';

export const getUserInfo = () =>
  axios.get<undefined, UserInfo>(`${BASE_URL}/me`);

export const getLikes = () =>
  axios.get<undefined, AxiosResponse<GetLikesRes>>(`${BASE_URL}/likes`);

export const createLike = (params: CreateLikeReq) =>
  axios.post<CreateLikeReq, undefined>(`${BASE_URL}/likes`, params);

export const deleteLike = (params: DeleteLike) =>
  axios.delete<{place_id: string}, undefined>(`${BASE_URL}/likes`, {
    params: {place_id: params.placeID},
  });
