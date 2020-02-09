import {Moment} from 'moment';
import {CoordsInterface} from '@store/reducers/case';

interface DateInterface {
  date: Moment;
}

interface NameInterface {
  name: string;
}

// CATEGORY
export interface GetCategoriesReq extends DateInterface {}

export type GetCategoriesRes = NameInterface[];
// END CATEGORY

// NEARBY_LOCATION
export interface GetNearbyLocationReq extends CoordsInterface {
  radius?: number; // defaultValue = 3000
  count?: number; // defaultValue = 5
}

interface NearbyLocation extends NameInterface {
  id: string;
  rating: number;
  location: CoordsInterface;
}

export type GetNearbyLocationRes = NearbyLocation[];
// END NEARBY_LOCATION

// SITUATION
export interface GetSituationsReq extends DateInterface {}

export type GetSituationsRes = NameInterface[];
// END SITUATION

// RESTAURANT
export interface GetRestaurantReq extends CoordsInterface {
  category: string;
  situation: string;
}

export interface GetRestaurantRes {
  id: string;
  name: string;
  rating: number;
  location: CoordsInterface;
}
// END RESTAURANT
