import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
import {
  UPDATE_CONTENT,
  MessageAction,
  UPDATE_LOADING,
  HIDE_MESSAGE,
  RESET_PRESS_ACTION,
} from '../actions/message';

export interface MessageState {
  content: string;
  loading: boolean;
  hide: boolean;
  onPress?: () => void; // content와 연관된 특별한 액션
}

const initState: MessageState = {
  content: '배고프나옹?',
  loading: false,
  hide: false,
};

const messageReducer = createReducer<MessageState, MessageAction>(initState, {
  [UPDATE_CONTENT]: (state, action) => ({
    ...state,
    ...action.payload,
    hide: false,
  }),
  [UPDATE_LOADING]: copyPayload,
  [HIDE_MESSAGE]: state => ({...state, hide: true}),
  [RESET_PRESS_ACTION]: state => ({...state, onPress: undefined}),
});

export default messageReducer;
