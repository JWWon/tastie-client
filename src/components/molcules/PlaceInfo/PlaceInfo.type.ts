import {Recommendation} from '@services/recommendations';

export interface Props extends Omit<Recommendation, 'photoUrls'> {}
