import axios from 'axios';

import {GetGraphFromFBReq, GetGraphFromFBRes} from './auth.type';

const facebookInstace = axios.create({
  baseURL: 'https://graph.facebook.com',
});
export const loginWithFacebook = ({
  userID,
  accessToken,
  fields,
}: GetGraphFromFBReq) =>
  facebookInstace.get<GetGraphFromFBReq, GetGraphFromFBRes>(`/${userID}`, {
    params: {access_token: accessToken, fields},
  });
