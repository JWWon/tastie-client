import axios from 'axios';

import {BASE_URL} from '@utils/consts';

function config() {
  axios.defaults.baseURL = BASE_URL[__DEV__ ? 'DEVELOPMENT' : 'PRODUCTION'];
}

function setToken(token: string) {
  axios.defaults.headers.common.Authorization = token;
}

function removeToken() {
  delete axios.defaults.headers.common.Authroization;
}

export default {config, setToken, removeToken};
