/**
 * @prop fields
 * separate field with comma(,)
 * detail: https://developers.facebook.com/docs/graph-api/reference/user
 */
export interface GetGraphFromFBReq {
  userID: string;
  accessToken: string;
  fields: string;
}

export interface GetGraphFromFBRes {
  [key: string]: string;
}
