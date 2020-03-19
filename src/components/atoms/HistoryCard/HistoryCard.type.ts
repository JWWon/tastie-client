import {Recommendation} from '@services/recommendations';

export type EmptyProps = Pick<Recommendation, 'id'>;

export type Props = Recommendation;
