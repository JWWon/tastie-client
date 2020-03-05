import {Recommendation} from '@services/recommendations';

export interface Params extends Recommendation {
  distance: string;
}
