import {Platform, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// REDUX HELPER
export const copyPayload = <S, A extends {payload: any}>(
  state: S,
  action: A,
) => ({
  ...state,
  ...action.payload,
});

export const setError = <S, A extends {payload: any}>(state: S, action: A) => ({
  ...state,
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
