import {GetRecommendRes} from '@services/recommend/recommend.type';

export interface Props extends GetRecommendRes {
  onDismiss: () => void;
}
