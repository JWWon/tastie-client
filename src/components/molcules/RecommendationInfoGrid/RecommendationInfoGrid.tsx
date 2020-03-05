import React from 'react';
import _ from 'lodash';

import RecommendationInfo, {
  Props as InfoProps,
} from '@components/atoms/RecommendationInfo';
import * as s from './RecommendationInfoGrid.style';

interface Props {
  data: InfoProps[];
  numColumns?: number; // Should greater than 2
}

const LabelGrid: React.FC<Props> = ({data, numColumns, children}) => {
  const columns = numColumns || 2;
  return (
    <s.Container>
      {_.chunk(data, columns).map((row: InfoProps[], rowIdx) => (
        <s.InfoColumnWrapper key={rowIdx.toString()}>
          {row.map((item: InfoProps) => (
            <RecommendationInfo key={item.title} {...item} />
          ))}
          {row.length < columns && (
            <s.ExtraSpace style={{flex: columns - row.length}} />
          )}
        </s.InfoColumnWrapper>
      ))}
      {/* custom column */}
      <s.InfoColumnWrapper>{children}</s.InfoColumnWrapper>
    </s.Container>
  );
};

export default LabelGrid;
