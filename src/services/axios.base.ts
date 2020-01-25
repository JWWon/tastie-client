import axios from 'axios';

import consts from '@utils/consts';

class Network {
  init() {
    axios.defaults.baseURL =
      consts.BASE_URL[__DEV__ ? 'DEVELOPMENT' : 'PRODUCTION'];
  }
}

// singleton pattern
const network = new Network();
export default network;
