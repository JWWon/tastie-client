import React from 'react';

import * as s from './BaseView.style';

interface Props {
  noWrapper?: boolean;
}

const BaseView: React.FC<Props> = ({noWrapper, children}) => {
  const renderView = <s.ViewWrapper>{children}</s.ViewWrapper>;

  return (
    <s.FullScreen>
      <s.Container>{noWrapper ? children : renderView}</s.Container>
    </s.FullScreen>
  );
};

export default BaseView;
