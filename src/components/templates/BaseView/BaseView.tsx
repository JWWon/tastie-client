import React from 'react';

import * as s from './BaseView.style';

interface Props {
  // for @components/templates/KeyboardSafeView
  noPaddingVertical?: boolean;
}

const BaseView: React.FC<Props> = ({noPaddingVertical, children}) => (
  <s.FullScreen>
    <s.Container>
      {noPaddingVertical ? (
        children
      ) : (
        <s.VerticalSpace>{children}</s.VerticalSpace>
      )}
    </s.Container>
  </s.FullScreen>
);

export default BaseView;
