import {RecommendState} from '@store/reducers/recommend';

export interface Props extends Omit<RecommendState, 'loading'> {
  onDismiss: () => void;
}
