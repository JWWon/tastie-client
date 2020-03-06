import axios from 'axios';

import {UserInfo} from './user.type';

const BASE_URL = '/user';

export const getUserInfo = () =>
  axios.get<undefined, UserInfo>(`${BASE_URL}/me`);
