import {CoordsInterface} from '@store/reducers/case';

interface UserInfo {
  positive?: boolean;
  distance?: string;
}

export interface GetDiscoveriesReq extends CoordsInterface {
  category: string;
  situation: string;
}

export interface Discovery extends UserInfo {
  id: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  priceLevel: number;
  location: CoordsInterface;
  address: string;
  photoUrl: string;
}

export type GetDiscoveriesRes = Discovery[];

export interface DiscoveryDetail extends UserInfo {
  id: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  priceLevel: number;
  types: string[];
  location: CoordsInterface;
  formattedAddress: string;
  formattedPhoneNumber: string;
  website: string;
  photoUrls: string[];
  openingHours: {
    openNow: boolean;
    weekdayText?: string[];
  };
}
