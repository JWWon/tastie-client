import axios from 'axios';

import consts from '@utils/consts';

function config() {
  axios.defaults.baseURL =
    consts.BASE_URL[__DEV__ ? 'DEVELOPMENT' : 'PRODUCTION'];
}

export default {config};
