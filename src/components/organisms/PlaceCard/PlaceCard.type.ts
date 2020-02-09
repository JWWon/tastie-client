import {NavigationInjectedProps} from 'react-navigation';

import {GetRecommendRes} from '@services/recommend/recommend.type';

export type Props = GetRecommendRes & NavigationInjectedProps;
