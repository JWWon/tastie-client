export interface UserInfo {
  id: number;
  name: string;
  email: string;
  birthYear: number;
}

export interface Like {
  placeID: string;
  positive: boolean;
}

export type GetLikesRes = Like[];

export type CreateLikeReq = Like;

export type DeleteLike = Pick<Like, 'placeID'>;
