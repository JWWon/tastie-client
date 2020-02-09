import axios from 'axios';

import {
  GetCategoriesReq,
  GetCategoriesRes,
  GetSituationsReq,
  GetSituationsRes,
  GetRestaurantReq,
  GetRestaurantRes,
  GetNearbyLocationReq,
  GetNearbyLocationRes,
} from './case.type';

const BASE_URL = '/restaurant';

export const getCategories = (params: GetCategoriesReq) =>
  axios.get<GetCategoriesReq, GetCategoriesRes>(`${BASE_URL}/categories`, {
    params,
  });

export const getNearbyLocations = (params: GetNearbyLocationReq) =>
  axios.get<GetNearbyLocationReq, GetNearbyLocationRes>('/places', {params});

export const getSituations = (params: GetSituationsReq) =>
  axios.get<GetSituationsReq, GetSituationsRes>(`${BASE_URL}/situations`, {
    params,
  });

export const getRestarant = (params: GetRestaurantReq) =>
  axios.get<GetRestaurantReq, GetRestaurantRes>(`${BASE_URL}/restaurant`, {
    params,
  });
