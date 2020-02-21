import axios from 'axios';

import {GetAddressReq, GetAddressRes} from './coordinate.type';

const BASE_URL = '/coordinate';

export const getAddress = (params: GetAddressReq) =>
  axios.get<GetAddressReq, GetAddressRes>(`${BASE_URL}/address`, {params});
