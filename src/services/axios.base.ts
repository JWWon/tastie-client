import axios from 'axios';

import {BASE_URL} from '@utils/consts';

export interface ResponseError {
  statusCode: number;
  message: string;
}

function config() {
  axios.defaults.baseURL = BASE_URL[__DEV__ ? 'DEVELOPMENT' : 'PRODUCTION'];
}

function setToken(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function removeToken() {
  delete axios.defaults.headers.common['Authorization'];
}

export default {config, setToken, removeToken};
