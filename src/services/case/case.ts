import axios from 'axios';

import consts from '@utils/consts';
import {
  GetCategoriesReq,
  GetCategoriesRes,
  GetSituationsReq,
  GetSituationsRes,
  GetRestaurantReq,
  GetRestaurantRes,
  GetNearbyLocationsReq,
  GetNearbyLocationsRes,
  SearchLocationsReq,
  SearchLocationsAPIReq,
  SearchLocationsAPIRes,
  GetLocationDetailsReq,
  GetLocationDetailsAPIReq,
  GetLocationDetailsAPIRes,
  GetAddressReq,
  GetAddressRes,
} from './case.type';

const {GOOGLE_PLACE_KEY} = consts;
const BASE_URL = '/restaurant';

export const getCategories = (params: GetCategoriesReq) =>
  axios.get<GetCategoriesReq, GetCategoriesRes>(`${BASE_URL}/categories`, {
    params,
  });

export const getNearbyLocations = (params: GetNearbyLocationsReq) =>
  axios.get<GetNearbyLocationsReq, GetNearbyLocationsRes>('/places', {params});

export const getAddress = (params: GetAddressReq) =>
  axios.get<GetAddressReq, GetAddressRes>('/places/address', {params});

export const getSituations = (params: GetSituationsReq) =>
  axios.get<GetSituationsReq, GetSituationsRes>(`${BASE_URL}/situations`, {
    params,
  });

export const getRestarant = (params: GetRestaurantReq) =>
  axios.get<GetRestaurantReq, GetRestaurantRes>(`${BASE_URL}/restaurant`, {
    params,
  });

// Google Place API
const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/place';
export const searchLocations = (params: SearchLocationsReq) =>
  axios.get<SearchLocationsAPIReq, SearchLocationsAPIRes>(
    `${GOOGLE_URL}/autocomplete/json`,
    {params: {...params, key: GOOGLE_PLACE_KEY}},
  );

export const getLocationDetails = (params: GetLocationDetailsReq) =>
  axios.get<GetLocationDetailsAPIReq, GetLocationDetailsAPIRes>(
    `${GOOGLE_URL}/details/json`,
    {params: {...params, key: GOOGLE_PLACE_KEY}},
  );
