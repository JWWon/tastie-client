import {createReducer} from 'typesafe-actions';

import {
  UPDATE_CATEGORY,
  UPDATE_PLACE,
  UPDATE_LOCATION,
  UPDATE_SITUATION,
  CaseAction,
} from '../actions/case';

interface CaseState {
  category: string;
  situation: string;
  place: string;
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
});

export default caseReducer;
