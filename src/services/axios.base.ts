import axios from 'axios';

import {BASE_URL} from '@utils/consts';

function config() {
  axios.defaults.baseURL = BASE_URL[__DEV__ ? 'DEVELOPMENT' : 'PRODUCTION'];
}

export default {config};
