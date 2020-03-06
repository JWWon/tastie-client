import axios from 'axios';

import {
  GetTokenReq,
  GetTokenRes,
  SignupReq,
  SignupRes,
  CheckAuthExistReq,
} from './auth.type';

const BASE_URL = '/auth';

export const getToken = (params: GetTokenReq) =>
  axios.post<GetTokenReq, GetTokenRes>(`${BASE_URL}/token`, params);

interface SignupAPIReq extends Omit<SignupReq, 'birthYear'> {
  birthYear?: number;
}

function filterBirthYear({birthYear, ...params}: SignupReq) {
  const payload: SignupAPIReq = {...params};
  if (birthYear && birthYear.length === 4) {
    payload.birthYear = parseInt(birthYear, 10);
  }
  return payload;
}

export const signup = (params: SignupReq) =>
  axios.post<SignupAPIReq, SignupRes>(
    `${BASE_URL}/signup`,
    filterBirthYear(params),
  );

export const checkAuthExist = (params: CheckAuthExistReq) =>
  axios.get<CheckAuthExistReq, undefined>(`${BASE_URL}/accounts`, {params});
