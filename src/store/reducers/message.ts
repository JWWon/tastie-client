import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
import {
  UPDATE_CONTENT,
  MessageAction,
  UPDATE_LOADING,
  UPDATE_HIDE,
  DELETE_PRESS_ACTION,
} from '../actions/message';

export interface MessageState {
  content: string;
  loading: boolean;
  hide: boolean;
  onPress?: () => void;
}

const initState: MessageState = {
  content: '',
  loading: true,
  hide: false,
};

const messageReducer = createReducer<MessageState, MessageAction>(initState, {
  [UPDATE_CONTENT]: copyPayload,
  [UPDATE_LOADING]: copyPayload,
  [UPDATE_HIDE]: copyPayload,
  [DELETE_PRESS_ACTION]: state => ({...state, onPress: undefined}),
});

export default messageReducer;
