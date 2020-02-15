import {Platform, Alert, Linking} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {CoordsInterface} from '@store/reducers/case';
import consts from '@utils/consts';

const {APP_IDENTIFIER} = consts;

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

// PERMISSION HELPER
const LOCATION_PERMISSON =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export const checkPermission = async () => {
  try {
    let status = await check(LOCATION_PERMISSON);
    if (status === RESULTS.DENIED) {
      status = await requestPermission(LOCATION_PERMISSON);
    }

    switch (status) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        Alert.alert('정확한 음식 추천을 위해 위치정보를 승인해주세요.');
        break;
      case RESULTS.UNAVAILABLE:
        Alert.alert('지원하는 디바이스가 아닙니다.');
        break;
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};

const requestPermission = async (
  PERMISSON: any,
): Promise<'unavailable' | 'denied' | 'blocked' | 'granted'> => {
  const status = await request(PERMISSON);

  if (status === RESULTS.DENIED) {
    return requestPermission(PERMISSON);
  }
  return status;
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
    return (distKilometer * 1000).toString(10).slice(0, 3) + 'm';
  }
  return distKilometer.toString(10).slice(0, 3) + 'km';
};
// END CALCULATE_DISTANCE

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

// PHONE_CALL
export const makePhoneCall = (phoneNumber: string) => {
  // only works on real iOS device!
  const filteredNumber = phoneNumber.replace(/-/g, '');
  const baseURL = Platform.select({ios: 'telprompt', android: 'tel'});
  openLink(`${baseURL}:${filteredNumber}`);
};
// END PHONE_CALL

// OPEN_NAVER_MAP
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
// END OPEN_NAVER_MAP
