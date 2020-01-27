import {createReducer} from 'typesafe-actions';

import {
  UPDATE_CASE,
  UPDATE_LOCATION,
  UPDATE_DESCRIPTION,
  SituationAction,
} from '../actions/situation';

interface SituationState {
  mealType: string;
  description: string;
  location?: {latitude: number; longitude: number};
}

// HELPER
const pastePayload = (state: SituationState, action: SituationAction) => ({
  ...state,
  ...action.payload,
});
// END HELPER

const initState: SituationState = {
  mealType: '',
  description: '',
};

const situation = createReducer<SituationState, SituationAction>(initState, {
  [UPDATE_CASE]: pastePayload,
  [UPDATE_LOCATION]: (state, action) => ({...state, location: action.payload}),
  [UPDATE_DESCRIPTION]: pastePayload,
});

export default situation;
