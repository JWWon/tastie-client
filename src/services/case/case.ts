import axios from 'axios';

import {GOOGLE_PLACE_KEY} from '@utils/consts';
import {
  GetCategoriesReq,
  GetCategoriesRes,
  GetSituationsReq,
  GetSituationsRes,
  GetNearbyLocationsReq,
  GetNearbyLocationsRes,
  SearchLocationsReq,
  SearchLocationsAPIReq,
  SearchLocationsAPIRes,
  GetLocationDetailsReq,
  GetLocationDetailsAPIReq,
  GetLocationDetailsAPIRes,
  GetPreferencesReq,
  GetPreferencesRes,
} from './case.type';

const BASE_URL = '/case';

export const getCategories = (params: GetCategoriesReq) =>
  axios.get<GetCategoriesReq, GetCategoriesRes>(`${BASE_URL}/categories`, {
    params,
  });

export const getNearbyLocations = (params: GetNearbyLocationsReq) =>
  axios.get<GetNearbyLocationsReq, GetNearbyLocationsRes>(
    `${BASE_URL}/locations`,
    {params},
  );

export const getSituations = (params: GetSituationsReq) =>
  axios.get<GetSituationsReq, GetSituationsRes>(`${BASE_URL}/situations`, {
    params,
  });

export const getPreferences = (params: GetPreferencesReq) =>
  axios.get<GetPreferencesReq, GetPreferencesRes>(`${BASE_URL}/preferences`, {
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
