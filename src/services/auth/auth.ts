import axios from 'axios';

import {GetTokenReq, GetTokenRes, SignupReq, SignupRes} from './auth.type';
const BASE_URL = '/auth';

export const getToken = (params: GetTokenReq) =>
  axios.post<GetTokenReq, GetTokenRes>(`${BASE_URL}/token`, params);

export const signup = (params: SignupReq) =>
  axios.post<SignupReq, SignupRes>(`${BASE_URL}/signup`, params);
