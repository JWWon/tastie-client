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
  RECOMMENDATIONS: 'Recommendations' as const,
  HISTORY: 'History' as const,
  PROFILE: 'Profile' as const,
  // OTHER
  RECOMMENDATION_DETAIL: 'RecommendationDetail' as const,
  // Session
  WELCOME: 'Welcome' as const,
  SIGNUP: 'Signup' as const,
  SIGNUP_META: 'SignupMeta' as const,
  LOGIN: 'Login' as const,
};

export const EVENT = {
  GO_BACK_TO_CASE_SCREEN: 'go_back_to_case_screen' as const,
  USER_COORDINATE: 'user_coordinate' as const,
  VISITED_RECOMMENDATIONS: 'visited_recommendations' as const,
  SEARCH_RECOMMEND: 'search_recommend' as const,
  SEARCH_RECOMMEND_FAILURE: 'search_recommend_failure' as const,
  LOCATION_PERMISSION: 'location_permission' as const,
  PRESS_LIKE: 'press_like' as const,
  RECALL_LIKE: 'recall_like' as const,
};

// String
export const MY_LOCATION = '내 위치';
export const APP_IDENTIFIER = 'me.tastie.client';
export const CHARACTER_NAME = '고양이';
