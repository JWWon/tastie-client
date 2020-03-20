import firebase from '@react-native-firebase/app';
import moment from 'moment';
import {Platform, Linking} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {CoordsInterface} from '@store/reducers/case';
import {APP_IDENTIFIER, EVENT} from '@utils/consts';

// REDUX HELPER
export const setPending = <S>(state: S) => ({...state, error: undefined});

export const setPendingWithLoading = <S>(state: S) => ({
  ...state,
  loading: true,
  error: undefined,
});

export const copyPayload = <S, A extends {payload: any}>(
  state: S,
  action: A,
) => ({...state, ...action.payload});

export const copyPayloadWithLoading = <S, A extends {payload: any}>(
  state: S,
  action: A,
) => ({...state, ...action.payload, loading: false});

export const setError = <S, A extends {payload: any}>(state: S, action: A) => ({
  ...state,
  error: action.payload,
});

export const setErrorWithLoading = <S, A extends {payload: any}>(
  state: S,
  action: A,
) => ({
  ...state,
  loading: false,
  error: action.payload,
});

export function isAxiosError(error: any) {
  return typeof error === 'object' && error.isAxiosError;
}
// END REDUX HELPER

// PERMISSION HELPER
const LOCATION_PERMISSON = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

export const checkPermission = async () => {
  if (!LOCATION_PERMISSON) return;

  let status = await check(LOCATION_PERMISSON);
  if (status === RESULTS.DENIED) {
    status = await request(LOCATION_PERMISSON);
  }

  firebase.analytics().logEvent(EVENT.LOCATION_PERMISSION, {status});

  if (status !== RESULTS.GRANTED) Promise.reject('Permission not granted');
};
// END PERMISSION HELPER

// CALCULATE_DISTANCE
export const getDistance = (
  {latitude: lat1, longitude: lon1}: CoordsInterface,
  {latitude: lat2, longitude: lon2}: CoordsInterface,
) => {
  // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  const distKilometer = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  if (distKilometer < 1) {
    return (distKilometer * 1000).toString(10).split('.')[0] + 'm';
  }
  return distKilometer.toString(10).slice(0, 3) + 'km';
};
// END CALCULATE_DISTANCE

// OPEN_LINK HELPER
const openLink = async (path: string, backupPath?: string) => {
  try {
    const url = encodeURI(path);
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      if (!backupPath) {
        throw new Error(`invalid URL provided: ${url}`);
      }
      openLink(backupPath);
      return;
    }
    await Linking.openURL(url);
  } catch (e) {
    Promise.reject(e);
  }
};

export const makePhoneCall = (phoneNumber: string) => {
  // only works on real iOS device!
  const filteredNumber = phoneNumber.replace(/-/g, '');
  const baseURL = Platform.select({ios: 'telprompt', android: 'tel'});
  openLink(`${baseURL}:${filteredNumber}`);
};

interface OpenNaverMap extends CoordsInterface {
  name: string;
}
export const openNaverMap = (params: OpenNaverMap) => {
  const baseURL = 'nmap';
  const mapParams = [
    `appname=${APP_IDENTIFIER}`,
    `lat=${params.latitude}`,
    `lng=${params.longitude}`,
    `name=${params.name}`,
  ];

  const backupURL = Platform.select({
    ios: 'http://itunes.apple.com/app/id311867728?mt=8', // open AppStore
    android: 'market://details?id=com.nhn.android.nmap', // open PlayStore
  });

  openLink(`${baseURL}://place?${mapParams.join('&')}`, backupURL);
};
// END OPEN_LINK HELPER

// RECOMMENDATION_DETAIL
export function getPriceLevel(level: number) {
  switch (level) {
    case 0:
      return '5000원 미만';
    case 1:
      return '5000원 - 1만원';
    case 2:
      return '1만원 - 2만원';
    case 3:
      return '2만원 - 5만원';
    case 4:
      return '5만원 이상';
    default:
      return '알 수 없음';
  }
}

export function getTodayOpeningHours(hours?: string[]): string {
  const today = (moment().weekday() + 6) % 7;
  return hours && typeof hours[today] === 'string'
    ? hours[today].split(': ')[1].replace(', ', '\n')
    : '알 수 없음';
}
// END RECOMMENDATION_DETAIL

// SELECT_LIKE_ICON
export function selectLikeIcon(params: {positive?: boolean; black?: boolean}) {
  if (params.positive === undefined) {
    if (params.black)
      return require('@assets/images/icon-like/icon-like-empty-black.png');
    return require('@assets/images/icon-like/icon-like-empty.png');
  }

  if (params.positive) return require('@assets/images/icon-like/icon-like.png');
  return require('@assets/images/icon-dislike/icon-dislike.png');
}
// END SELECT_LIKE_ICON
