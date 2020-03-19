export interface UserInfo {
  id: number;
  name: string;
  email: string;
  birthYear: number;
}

export interface Like {
  placeID: string;
  positive: boolean;
  updatedAt: string;
  userID?: string;
}

export type GetLikesRes = Like[];

export type CreateLikeReq = Omit<Like, 'updatedAt'>;

export type DeleteLike = Pick<Like, 'placeID'>;
