import axios from 'axios';
import {GetRecommendReq, GetRecommendRes} from './recommend.type';

const BASE_URL = '/restaurant';

export const getRecommend = (params: GetRecommendReq) =>
  axios.get<GetRecommendReq, GetRecommendRes>(BASE_URL, {params});
