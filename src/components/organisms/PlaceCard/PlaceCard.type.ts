import {RecommendationState} from '@store/reducers/recommendation';

export interface Props extends Omit<RecommendationState, 'loading'> {
  onDismiss: () => void;
}
