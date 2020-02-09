import {createReducer} from 'typesafe-actions';

import {copyPayload, setError} from '@utils/helper';
import {
  GetCategoriesRes,
  GetSituationsRes,
  GetNearbyLocationRes,
} from '@services/case/case.type';
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
} from '../actions/case';

export interface CoordsInterface {
  latitude: number;
  longitude: number;
}

export interface LocationInterface extends CoordsInterface {
  name: string;
  address?: string;
}

interface CaseState {
  // AUTOCOMPLETE
  categories: GetCategoriesRes;
  locations: GetNearbyLocationRes;
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
  locations: [],
  situations: [],
  // SELECTED VALUE
  category: '',
  situation: '',
  location: {latitude: 0, longitude: 0, name: ''},
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
    locations: action.payload,
  }),
  [GET_NEARBY_LOCATIONS_FAILURE]: setError,
  [SELECT_LOCATION_SUCCESS]: (state, action) => ({
    ...state,
    location: action.payload,
  }),
  [SELECT_LOCATION_FAILURE]: setError,
  // WITHOUT MIDDLEWARE
  [CLEAR_CASE]: state => ({...state, ...initState}),
  [SELECT_CATEGORY]: copyPayload,
  [SELECT_SITUATION]: copyPayload,
  [SELECT_PREFERENCE]: copyPayload,
  [UPDATE_HAS_REQUIRED]: copyPayload,
});

export default caseReducer;
