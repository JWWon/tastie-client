import {createAction, ActionType, createAsyncAction} from 'typesafe-actions';
import {GeoError} from 'react-native-geolocation-service';
import {AxiosError} from 'axios';

import {
  GetCategoriesRes,
  GetSituationsRes,
  GetNearbyLocationReq,
  GetNearbyLocationRes,
} from '@services/case/case.type';
import {LocationInterface, CoordsInterface} from '@store/reducers/case';

interface ButtonInterface {
  onPress: () => void;
}

// CLEAR_CASE
export const CLEAR_CASE = '@case/CLEAR_CASE';

export const clearCase = createAction(CLEAR_CASE, () => {})();
// END CLEAR_CASE

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

// GET_USER_COORDS
export const GET_USER_COORDS = '@case/GET_USER_COORDS_REQUEST';
export const GET_USER_COORDS_SUCCESS = '@case/GET_USER_COORDS_SUCCESS';
export const GET_USER_COORDS_FAILURE = '@case/GET_USER_COORDS_FAILURE';

export const getUserCoords = createAsyncAction(
  GET_USER_COORDS,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
)<undefined, CoordsInterface, GeoError>();
// END GET_USER_COORDS

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
)<GetNearbyLocationReq, GetNearbyLocationRes, AxiosError>();
// END GET_NEARBY_LOCATIONS

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
  // optional interface NearbyLocation
  id?: string;
  rating?: string;
  location?: CoordsInterface;
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
  getCategories,
  getSituations,
  getUserCoords,
  getNearbyLocations,
  selectCategory,
  selectLocation,
  selectSituation,
  selectPreference,
  updateHasRequired,
};
export type CaseAction = ActionType<typeof actions>;
