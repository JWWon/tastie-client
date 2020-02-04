import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
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

const initState: CaseState = {
  category: '',
  situation: '',
  place: '',
};

const caseReducer = createReducer<CaseState, CaseAction>(initState, {
  [UPDATE_CATEGORY]: copyPayload,
  [UPDATE_PLACE]: copyPayload,
  [UPDATE_LOCATION]: (state, action) => ({...state, location: action.payload}),
  [UPDATE_SITUATION]: copyPayload,
  [UPDATE_PREFERENCE]: copyPayload,
});

export default caseReducer;
