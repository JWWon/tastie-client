import {RecommendationState} from '@store/reducers/recommendation';

export interface Props
  extends Omit<RecommendationState, 'photoUrls' | 'loading'> {}
