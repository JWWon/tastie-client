import React from 'react';
import _ from 'lodash';

import DiscoveryInfo, {
  Props as InfoProps,
} from '@components/atoms/DiscoveryInfo';
import * as s from './DiscoveryInfoGrid.style';

interface Props {
  data: InfoProps[];
  numColumns?: number; // Should greater than 2
}

const DiscoveryInfoGrid: React.FC<Props> = ({data, numColumns, children}) => {
  const columns = numColumns || 2;
  return (
    <s.Container>
      {_.chunk(data, columns).map((row: InfoProps[], rowIdx) => (
        <s.InfoColumnWrapper key={rowIdx.toString()}>
          {row.map((item: InfoProps) => (
            <DiscoveryInfo key={item.title} {...item} />
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

export default DiscoveryInfoGrid;
