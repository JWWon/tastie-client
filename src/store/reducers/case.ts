/* eslint-disable no-fallthrough */
import {createReducer} from 'typesafe-actions';
import produce from 'immer';

import {copyPayload, setError} from '@utils/helper';
import {
  GetCategoriesRes,
  GetSituationsRes,
  GetNearbyLocationsRes,
  SearchLocationsRes,
} from '@services/case';
import {
  CaseAction,
  CLEAR_CASE,
  SELECT_CATEGORY,
  SELECT_SITUATION,
  SELECT_PREFERENCE,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_SITUATIONS_SUCCESS,
  GET_SITUATIONS_FAILURE,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
  SELECT_LOCATION_SUCCESS,
  UPDATE_HAS_REQUIRED,
  SELECT_LOCATION_FAILURE,
  GET_NEARBY_LOCATIONS_SUCCESS,
  GET_NEARBY_LOCATIONS_FAILURE,
  CLEAR_CASE_PARTLY,
  SEARCH_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
} from '../actions/case';

export interface CoordsInterface {
  latitude: number;
  longitude: number;
}

export interface LocationInterface extends CoordsInterface {
  name: string;
  address: string;
}

export enum CaseIndex {
  CATEGORY,
  LOCATION,
  SITUATION,
  PREFERENCE,
}

interface CaseState {
  // AUTOCOMPLETE
  categories: GetCategoriesRes;
  nearbyLocations: GetNearbyLocationsRes;
  searchedLocations: SearchLocationsRes;
  situations: GetSituationsRes;
  // SELECTED VALUE
  category: string;
  situation: string;
  location: LocationInterface;
  // META DATA
  userCoords: CoordsInterface;
  preference?: string; // meta data
  // ERROR
  error?: any;
  // OTHERS
  hasRequired: boolean;
}

const initState: CaseState = {
  // AUTOCOMPLETE
  categories: [],
  nearbyLocations: [],
  searchedLocations: [],
  situations: [],
  // SELECTED VALUE
  category: '',
  situation: '',
  location: {latitude: 0, longitude: 0, name: '', address: ''},
  userCoords: {latitude: 0, longitude: 0},
  // OTHERS
  hasRequired: false,
};

const caseReducer = createReducer<CaseState, CaseAction>(initState, {
  // ASYNC
  [GET_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    categories: action.payload,
  }),
  [GET_CATEGORIES_FAILURE]: setError,
  [GET_SITUATIONS_SUCCESS]: (state, action) => ({
    ...state,
    situations: action.payload,
  }),
  [GET_SITUATIONS_FAILURE]: setError,
  [GET_USER_COORDS_SUCCESS]: (state, action) => ({
    ...state,
    userCoords: action.payload,
  }),
  [GET_USER_COORDS_FAILURE]: setError,
  [GET_NEARBY_LOCATIONS_SUCCESS]: (state, action) => ({
    ...state,
    nearbyLocations: action.payload,
  }),
  [GET_NEARBY_LOCATIONS_FAILURE]: setError,
  [SEARCH_LOCATIONS_SUCCESS]: (state, action) => ({
    ...state,
    searchedLocations: action.payload,
  }),
  [SEARCH_LOCATIONS_FAILURE]: setError,
  [SELECT_LOCATION_SUCCESS]: (state, action) => ({
    ...state,
    searchedLocations: [], // initializing
    location: action.payload,
  }),
  [SELECT_LOCATION_FAILURE]: setError,
  // WITHOUT MIDDLEWARE
  [CLEAR_CASE]: () => initState,
  [CLEAR_CASE_PARTLY]: (state, action) =>
    produce(state, draft => {
      switch (action.payload) {
        // IMPORTANT! do not put `break` keyword
        case CaseIndex.CATEGORY:
          draft.category = initState.category;
        case CaseIndex.LOCATION:
          draft.location = initState.location;
        case CaseIndex.SITUATION:
          draft.situation = initState.situation;
          draft.hasRequired = initState.hasRequired;
        case CaseIndex.PREFERENCE:
          delete draft.preference;
      }
    }),
  [SELECT_CATEGORY]: copyPayload,
  [SELECT_SITUATION]: copyPayload,
  [SELECT_PREFERENCE]: copyPayload,
  [UPDATE_HAS_REQUIRED]: copyPayload,
});

export default caseReducer;
