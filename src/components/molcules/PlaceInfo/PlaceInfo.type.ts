import {GetRecommendRes} from '@services/recommend/recommend.type';

export interface Props extends Omit<GetRecommendRes, 'photoUrls'> {}
