import axios, {AxiosResponse} from 'axios';
import {
  GetRecommendationsReq,
  GetRecommendationsRes,
  Recommendation,
} from './recommendations.type';

const BASE_URL = '/recommendations';

export const getRecommendations = (params: GetRecommendationsReq) =>
  axios.get<GetRecommendationsReq, AxiosResponse<GetRecommendationsRes>>(
    BASE_URL,
    {params},
  );

export const getRecommendation = (placeID: string) =>
  axios.get<undefined, AxiosResponse<Recommendation>>(`${BASE_URL}/${placeID}`);
