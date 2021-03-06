/**
 * token: AccessToken from social provider
 * accessToken : AccessToken from backend(JWT format)
 */

export type TypeInterface = 'email' | 'google' | 'facebook';

// GET_TOKEN
export interface GetTokenReq {
  type: TypeInterface;
  // for social login
  token?: string;
  // for email login
  email?: string;
  password?: string;
}

export interface GetTokenRes {
  type: TypeInterface;
  accessToken: string;
  expiresIn: number;
}
// END GET_TOKEN

// SIGNUP
export interface SignupReq {
  type: TypeInterface;
  name?: string;
  birthYear?: string;
  // for social
  token?: string;
  // for email
  email?: string;
  password?: string;
}

export type SignupRes = undefined;
// END SIGNUP

// CHECK_AUTH_EXIST
export interface CheckAuthExistReq {
  email: string;
}
// END CHECK_AUTH_EXIST

// CONFIRM_EMAIL
export interface ConfirmEmail {
  email: string;
}
// END CONFIRM_EMAIL
