import {Moment} from 'moment';
import {CoordsInterface, LocationInterface} from '@store/reducers/case';

interface DateInterface {
  date: Moment;
}

interface NameInterface {
  name: string;
}

type GoogleStatus =
  | 'OK'
  | 'ZERO_RESULTS'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKNOWN_ERROR';

// GET_CATEGORIES
export interface GetCategoriesReq extends DateInterface {}

export type GetCategoriesRes = NameInterface[];
// END GET_CATEGORIES

// GET_NEARBY_LOCATIONS
export interface GetNearbyLocationsReq extends CoordsInterface {
  radius?: number; // defaultValue = 3000
  count?: number; // defaultValue = 5
}

interface NearbyLocation extends NameInterface {
  id: string;
  rating: number;
  location: CoordsInterface;
}

export type GetNearbyLocationsRes = NearbyLocation[];
// END GET_NEARBY_LOCATIONS

// SEARCH_LOCATIONS
interface Substring {
  value: string;
  offset: number;
}

interface SearchLocationItem extends NameInterface {
  place_id: string;
}

export interface SearchLocationsReq {
  input: string;
  origin?: CoordsInterface;
  location?: CoordsInterface;
  radius?: number;
  language?: 'ko';
  types?: 'establishment' | 'geocode' | 'address';
  components?: string;
}

export type SearchLocationsRes = SearchLocationItem[];

/* GOOGLE_PLACE_API */
export interface SearchLocationsAPIReq extends SearchLocationsReq {
  key: string;
}

export interface SearchLocationsAPIRes {
  status: GoogleStatus;
  predictions: {
    description: string;
    distance_meters?: number;
    place_id: string;
    terms: Substring[];
    types: string[];
    matched_substrings: Substring[];
    structured_formatting: {
      main_text: string;
      secondary_text: string;
      main_text_matched_substrings: {length: number; offset: number}[];
    };
  }[];
}
// END SEARCH_LOCATIONS

// GET_LOCATION_DETAILS
export interface GetLocationDetailsReq {
  place_id: string;
  language?: 'ko' | 'en';
  region?: 'kr';
  sessiontoken?: string;
  fields?: string; // https://developers.google.com/places/web-service/details
}

export type GetLocationDetailsRes = LocationInterface;

/* GOOGLE_PLACE_API */
export interface GetLocationDetailsAPIReq extends GetLocationDetailsReq {
  key: string;
}

export interface GetLocationDetailsAPIRes {
  status: GoogleStatus;
  html_attributions: string[];
  result: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    adr_address: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    id: string;
    international_phone_number: string;
    name: string;
    place_id: string;
    rating: number;
    reference: string;
    reviews: {
      author_name: string;
      author_url: string;
      language: string;
      profile_photo_url: string;
      rating: number;
      relative_time_description: string;
      text: string;
      time: number; // Unix Timestamp
    }[];
    types: string[];
    url: string[];
    utc_offset: number;
    vicinity: string;
    website: string;
  };
}
// END GET_LOCATION_DETAILS

// GET_SITUATIONS
export interface GetSituationsReq {
  category: string;
}

export type GetSituationsRes = NameInterface[];
// END GET_SITUATIONS

// GET_RESTAURANT
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
// END GET_RESTAURANT

// GET_PREFERENCES
export interface GetPreferencesReq {
  situation: string;
}

export type GetPreferencesRes = NameInterface[];
// END GET_PREFERENCES
