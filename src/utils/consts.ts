// Object
export const BASE_URL = {
  DEVELOPMENT: 'https://staging.tastie.me/api',
  PRODUCTION: 'https://production.tastie.me/api',
};

export const SCREEN = {
  // Home
  CASE: 'Case' as const,
  RECOMMENDATIONS: 'Recommendations' as const,
  HISTORY: 'History' as const,
  PROFILE: 'Profile' as const,
  // Session
  WELCOME: 'Welcome' as const,
  SIGNUP: 'Signup' as const,
  SIGNUP_META: 'SignupMeta' as const,
  LOGIN: 'Login' as const,
};

// String
export const MY_LOCATION = '내 위치';
export const APP_IDENTIFIER = 'me.tastie.client';
export const CHARACTER_NAME = '고양이';
