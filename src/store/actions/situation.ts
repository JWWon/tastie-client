import {createAction, ActionType} from 'typesafe-actions';

// UPDATE_CASE
interface UpdateCase {
  mealType: string;
}

export const UPDATE_CASE = '@situation/UPDATE_CASE';

export const updateCase = createAction(
  UPDATE_CASE,
  (payload: UpdateCase) => payload,
)();
// END UPDATE_CASE

// UPDATE_LOCATION
interface UpdateLocation {
  latitude: number;
  longitude: number;
}

export const UPDATE_LOCATION = '@situation/UPDATE_LOCATION';

export const updateLocation = createAction(
  UPDATE_LOCATION,
  (payload: UpdateLocation) => payload,
)();
// END UPDATE_LOCATION

// UPDATE_DESCRIPTION
interface UpdateDescription {
  description: string;
}

export const UPDATE_DESCRIPTION = '@situation/UPDATE_DESCRIPTION';

export const updateDescription = createAction(
  UPDATE_DESCRIPTION,
  (payload: UpdateDescription) => payload,
)();
// END UPDATE_DESCRIPTION

const actions = {updateCase, updateLocation, updateDescription};
export type SituationAction = ActionType<typeof actions>;
