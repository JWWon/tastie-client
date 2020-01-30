import {createAction, ActionType} from 'typesafe-actions';

// UPDATE_CATEGORY
interface UpdateCategory {
  category: string;
}

export const UPDATE_CATEGORY = '@case/UPDATE_CATEGORY';

export const updateCategory = createAction(
  UPDATE_CATEGORY,
  (payload: UpdateCategory) => payload,
)();
// END UPDATE_CATEGORY

// UPDATE_PLACE
interface UpdatePlace {
  place: string;
}

export const UPDATE_PLACE = '@case/UPDATE_PLACE';

export const updatePlace = createAction(
  UPDATE_PLACE,
  (payload: UpdatePlace) => payload,
)();

// UPDATE_LOCATION
interface UpdateLocation {
  latitude: number;
  longitude: number;
}

export const UPDATE_LOCATION = '@case/UPDATE_LOCATION';

export const updateLocation = createAction(
  UPDATE_LOCATION,
  (payload: UpdateLocation) => payload,
)();
// END UPDATE_LOCATION

// UPDATE_SITUATION
interface UpdateSituation {
  situation: string;
}

export const UPDATE_SITUATION = '@case/UPDATE_SITUATION';

export const updateSituation = createAction(
  UPDATE_SITUATION,
  (payload: UpdateSituation) => payload,
)();
// END UPDATE_SITUATION

const actions = {
  updateCategory,
  updatePlace,
  updateLocation,
  updateSituation,
};
export type CaseAction = ActionType<typeof actions>;
