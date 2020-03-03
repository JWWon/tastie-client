import axios from 'axios';
import {
  GetRecommendationsReq,
  GetRecommendationsRes,
} from './recommendations.type';

const BASE_URL = '/recommendations';

export const getRecommendations = (params: GetRecommendationsReq) =>
  axios.get<GetRecommendationsReq, GetRecommendationsRes>(BASE_URL, {params});
