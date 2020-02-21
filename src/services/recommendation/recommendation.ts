import axios from 'axios';
import {
  GetRecommendationReq,
  GetRecommendationRes,
} from './recommendation.type';

const BASE_URL = '/recommendation';

export const getRecommendation = (params: GetRecommendationReq) =>
  axios.get<GetRecommendationReq, GetRecommendationRes>(BASE_URL, {params});
