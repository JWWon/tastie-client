import {CoordsInterface} from '@store/reducers/case';

export interface GetRecommendReq extends CoordsInterface {
  category: string;
  situation: string;
}

export interface GetRecommendRes {
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
    weekdayText: string[];
  };
}
