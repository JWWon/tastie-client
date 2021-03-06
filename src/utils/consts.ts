// Object
export const BASE_URL = {
  DEVELOPMENT: 'https://staging.tastie.me/api',
  PRODUCTION: 'https://production.tastie.me/api',
};

export const NAVIGATOR = {
  CONTENT: 'Content' as const,
};

export const SCREEN = {
  // CONTENT
  CASE: 'Case' as const,
  DISCOVERIES: 'Discoveries' as const,
  HISTORY: 'History' as const,
  PROFILE: 'Profile' as const,
  MAP_FULLSCREEN: 'MapFullscreen' as const,
  // OTHER
  DISCOVERY_DETAIL: 'DiscoveryDetail' as const,
  WEB_VIEW: 'WebView' as const,
  // SESSION
  WELCOME: 'Welcome' as const,
  SIGNUP: 'Signup' as const,
  SIGNUP_META: 'SignupMeta' as const,
  LOGIN: 'Login' as const,
  RESET_PASSWORD: 'ResetPassword' as const,
  CONFIRM_EMAIL: 'ConfirmEmail' as const,
};

export const EVENT = {
  // collect data
  USER_COORDINATE: 'user_coordinate' as const,
  LOCATION_PERMISSION: 'location_permission' as const,
  GET_DISCOVERIES_PERFORMANCE: 'get_discoveries_performance' as const,
  // track user action
  SIGNUP: 'signup' as const,
  GET_DISCOVERIES: 'get_discoveries' as const,
  VISITED_DISCOVERIES: 'visited_discoveries' as const,
  RATE_DISCOVERY: 'rate_discovery' as const,
  RESET_RATE_DISCOVERY: 'reset_rate_discovery' as const,
  SHARE_DISCOVERY: 'share_discovery' as const,
  PRESS_LOCATION_SEARCH: 'press_location_search' as const,
  PRESS_DISMISS_DISCOVERIES: 'press_dismiss_discoveries' as const,
  PRESS_TABBAR: 'press_tabbar' as const,
  CLEAR_CASE_PARTLY: 'clear_case_partly' as const,
  LOGOUT: 'logout' as const,
  // track error
  GET_DISCOVERIES_FAILURE: 'get_discoveries_failure' as const,
};

export const MESSAGE = {
  SHOW_DISCOVERIES: '열심히 골라봤어옹~!',
  SELECT_AGAIN: '다시 고르겠나옹?',
  // HAPPY
  READY_TO_DISCOVER: '뭐 먹을지 정해줄까옹?',
  POSITIVE: '맘에 든다니 기분이 좋다옹',
  // SAD
  NEGATIVE: '더 열심히 골라볼게옹..',
  DISMISS_DISCOVERIES: '골라준 음식이 별로인가옹..?',
  FAIL_TO_DISCOVER: '미안해옹.. 다시 물어봐줄래옹..?',
  CANNOT_FIND_RESULTS: '검색결과를 찾지 못했어옹..',
};

export const LOCATION = {
  MY_LOCATION: '내 위치',
};

// String
export const APP_IDENTIFIER = 'me.tastie.client';
export const CHARACTER_NAME = '고양이';
export const SEARCH = '직접 입력하기';
