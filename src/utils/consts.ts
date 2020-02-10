export default {
  BASE_URL: {
    DEVELOPMENT:
      'http://staging.xps2mymuer.ap-northeast-2.elasticbeanstalk.com/api',
    PRODUCTION: 'localhost:8000/api',
  },
  SCREEN: {
    CASE: 'Case' as const,
    RECOMMEND: 'Recommend' as const,
  },
  MY_LOCATION: '내 위치',
  GOOGLE_PLACE_KEY: 'AIzaSyBpJDvIpGqHSWQyDviBGcAZg4cb4_Qkiqk',
};
