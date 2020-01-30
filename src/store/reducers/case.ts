import {createReducer} from 'typesafe-actions';

import {
  UPDATE_CATEGORY,
  UPDATE_PLACE,
  UPDATE_LOCATION,
  UPDATE_SITUATION,
  CaseAction,
  UPDATE_PREFERENCE,
} from '../actions/case';

interface CaseState {
  category: string;
  situation: string; // meta data
  place: string;
  preference?: string; // meta data
  location?: {latitude: number; longitude: number};
}

// HELPER
const pastePayload = (state: CaseState, action: CaseAction) => ({
  ...state,
  ...action.payload,
});
// END HELPER

const initState: CaseState = {
  category: '',
  situation: '',
  place: '',
};

const caseReducer = createReducer<CaseState, CaseAction>(initState, {
  [UPDATE_CATEGORY]: pastePayload,
  [UPDATE_PLACE]: pastePayload,
  [UPDATE_LOCATION]: (state, action) => ({...state, location: action.payload}),
  [UPDATE_SITUATION]: pastePayload,
  [UPDATE_PREFERENCE]: pastePayload,
});

export default caseReducer;
