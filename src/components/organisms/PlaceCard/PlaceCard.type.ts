import {RecommendState} from '@store/reducers/recommend';

export interface Props extends RecommendState {
  onDismiss: () => void;
}
