import React from 'react';

import * as s from './Home.style';

interface Props {
  [option: string]: any;
}

const Template: React.FC<Props> = ({children, ...options}) => (
  <s.FullScreen>
    <s.Container>
      <s.ContentWrapper {...options}>{children}</s.ContentWrapper>
      <s.NavbarArea />
    </s.Container>
  </s.FullScreen>
);

export default Template;
