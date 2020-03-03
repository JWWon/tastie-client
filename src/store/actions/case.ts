import {createAction, ActionType, createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {
  GetCategoriesRes,
  GetSituationsRes,
  GetPreferencesRes,
  GetNearbyLocationsReq,
  GetNearbyLocationsRes,
  SearchLocationsReq,
  SearchLocationsRes,
} from '@services/case';
import {
  LocationInterface,
  CoordsInterface,
  CaseIndex,
} from '@store/reducers/case';

interface ButtonInterface {
  onPress: () => void;
}

// CLEAR_CASE
export const CLEAR_CASE = '@case/CLEAR_CASE';

export const clearCase = createAction(CLEAR_CASE)();
// END CLEAR_CASE

// CLEAR_CASE_PARTLY
export const CLEAR_CASE_PARTLY = '@case/CLEAR_CASE_PARTLY';

export const clearCasePartly = createAction(
  CLEAR_CASE_PARTLY,
  (payload: CaseIndex) => payload,
)();
// END CLEAR_CASE_PARTLY

// GET_CATEGORIES
export const GET_CATEGORIES = '@case/GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = '@case/GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = '@case/GET_CATEGORIES_FAILURE';

export const getCategories = createAsyncAction(
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
)<undefined, GetCategoriesRes, AxiosError>();
// END GET_CATEGORIES

// GET_SITUATIONS
export const GET_SITUATIONS = '@case/GET_SITUATIONS_REQUEST';
export const GET_SITUATIONS_SUCCESS = '@case/GET_SITUATIONS_SUCCESS';
export const GET_SITUATIONS_FAILURE = '@case/GET_SITUATIONS_FAILURE';

export const getSituations = createAsyncAction(
  GET_SITUATIONS,
  GET_SITUATIONS_SUCCESS,
  GET_SITUATIONS_FAILURE,
)<undefined, GetSituationsRes, AxiosError>();
// END GET_SITUATIONS

// GET_NEARBY_LOCATIONS
export const GET_NEARBY_LOCATIONS = '@case/GET_NEARBY_LOCATIONS_REQUEST';
export const GET_NEARBY_LOCATIONS_SUCCESS =
  '@case/GET_NEARBY_LOCATIONS_SUCCESS';
export const GET_NEARBY_LOCATIONS_FAILURE =
  '@case/GET_NEARBY_LOCATIONS_FAILURE';

export const getNearbyLocations = createAsyncAction(
  GET_NEARBY_LOCATIONS,
  GET_NEARBY_LOCATIONS_SUCCESS,
  GET_NEARBY_LOCATIONS_FAILURE,
)<GetNearbyLocationsReq, GetNearbyLocationsRes, AxiosError>();
// END GET_NEARBY_LOCATIONS

// SEARCH_LOCATIONS
export const SEARCH_LOCATIONS = '@case/SEARCH_LOCATIONS_REQUEST';
export const SEARCH_LOCATIONS_SUCCESS = '@case/SEARCH_LOCATIONS_SUCCESS';
export const SEARCH_LOCATIONS_FAILURE = '@case/SEARCH_LOCATIONS_FAILURE';

export const searchLocations = createAsyncAction(
  SEARCH_LOCATIONS,
  SEARCH_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
)<SearchLocationsReq, SearchLocationsRes, AxiosError>();
// END SEARCH_LOCATIONS

// GET_PREFERENCES
export const GET_PREFERENCES = '@case/GET_PREFERENCES_REQUEST';
export const GET_PREFERENCES_SUCCESS = '@case/GET_PREFERENCES_SUCCESS';
export const GET_PREFERENCES_FAILURE = '@case/GET_PREFERENCES_FAILURE';

export const getPreferences = createAsyncAction(
  GET_PREFERENCES,
  GET_PREFERENCES_SUCCESS,
  GET_PREFERENCES_FAILURE,
)<undefined, GetPreferencesRes, AxiosError>();
// END GET_PREFERENCES

// SELECT_CATEGORY
interface SelectCategory extends ButtonInterface {
  category: string;
}

export const SELECT_CATEGORY = '@case/SELECT_CATEGORY';

export const selectCategory = createAction(
  SELECT_CATEGORY,
  (payload: SelectCategory) => payload,
)();
// END SELECT_CATEGORY

// SELECT_LOCATION
interface SelectLocation extends ButtonInterface {
  name: string;
  // NearbyLocations optional params
  location?: CoordsInterface;
  // SearchedLocations optional params
  place_id?: string;
}

export const SELECT_LOCATION = '@case/SELECT_LOCATION_REQUEST';
export const SELECT_LOCATION_SUCCESS = '@case/SELECT_LOCATION_SUCCESS';
export const SELECT_LOCATION_FAILURE = '@case/SELECT_LOCATION_FAILURE';

export const selectLocation = createAsyncAction(
  SELECT_LOCATION,
  SELECT_LOCATION_SUCCESS,
  SELECT_LOCATION_FAILURE,
)<SelectLocation, LocationInterface, AxiosError>();
// END SELECT_LOCATION

// SELECT_SITUATION
interface SelectSituation extends ButtonInterface {
  situation: string;
}

export const SELECT_SITUATION = '@case/SELECT_SITUATION';

export const selectSituation = createAction(
  SELECT_SITUATION,
  (payload: SelectSituation) => payload,
)();
// END SELECT_SITUATION

// SELECT_PREFERENCE
interface SelectPreference {
  preference: string;
}

export const SELECT_PREFERENCE = '@case/SELECT_PREFERENCE';

export const selectPreference = createAction(
  SELECT_PREFERENCE,
  (payload: SelectPreference) => payload,
)();
// END SELECT_PREFERENCE

// UPDATE_HAS_REQUIRED
interface UpdateHasRequired {
  hasRequired: boolean;
}

export const UPDATE_HAS_REQUIRED = '@case/UPDATE_HAS_REQUIRED';

export const updateHasRequired = createAction(
  UPDATE_HAS_REQUIRED,
  (payload: UpdateHasRequired) => payload,
)();
// END UPDATE_HAS_REQUIRED

const actions = {
  clearCase,
  clearCasePartly,
  getCategories,
  getSituations,
  getNearbyLocations,
  searchLocations,
  getPreferences,
  selectCategory,
  selectLocation,
  selectSituation,
  selectPreference,
  updateHasRequired,
};
export type CaseAction = ActionType<typeof actions>;
